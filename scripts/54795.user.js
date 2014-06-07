// ==UserScript==
// @name           mit225
// @namespace      http://userscripts.org/scripts/show/24984
// @include        http://apps.facebook.com/friendsforsale/chores*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @reference	   http://userscripts.org/scripts/show/52489

// ==/UserScript==

var FFS = {
	performClick : function(node) {
		var evt = document.createEvent("MouseEvents");
		evt.initEvent("click", true, false);
		node.dispatchEvent(evt);
	},
	
	work : function() {
		while (1) {
		var firstPets = $('span.pet_container:eq(0) a');
		if (firstPets.length) {
			FFS.performClick(firstPets[0]);
			
			var energy = $('span.energy', firstPets).html();
			
			var point = parseInt(energy.match(/([0-9]+)/i)[1]);

			var randFriend = 0;

			if (point < 10) break;
			
			if (point >= 100) {
				var work;
				
				work = $('span.chore_container:eq(0) a');

				FFS.performClick(work[0]);
				
				// friend
				var friend = $('span.friend_container:eq('+ randFriend +') a');
				FFS.performClick(friend[0]);
				
				// work
				var work = $('div.buy a');
				FFS.performClick(work[0]);
				point = point - 100;
			}

			if (point >= 75) {
				var work;
				
				work = $('span.chore_container:eq(11) a');

				FFS.performClick(work[0]);
				
				// friend
				var friend = $('span.friend_container:eq('+ randFriend +') a');
				FFS.performClick(friend[0]);
				
				// work
				var work = $('div.buy a');
				FFS.performClick(work[0]);
				point = point - 75;
			}

			if (point >= 60) {
				var work;
				
				work = $('span.chore_container:eq(9) a');

				FFS.performClick(work[0]);
				
				// friend
				var friend = $('span.friend_container:eq('+ randFriend +') a');
				FFS.performClick(friend[0]);
				
				// work
				var work = $('div.buy a');
				FFS.performClick(work[0]);
				point = point - 60;
			}

			if (point >= 50) {
				var work;
				
				work = $('span.chore_container:eq(8) a');

				FFS.performClick(work[0]);
				
				// friend
				var friend = $('span.friend_container:eq('+ randFriend +') a');
				FFS.performClick(friend[0]);
				
				// work
				var work = $('div.buy a');
				FFS.performClick(work[0]);
				point = point - 50;
			}

			if (point >= 40) {
				var work;
				
				work = $('span.chore_container:eq(7) a');

				FFS.performClick(work[0]);
				
				// friend
				var friend = $('span.friend_container:eq('+ randFriend +') a');
				FFS.performClick(friend[0]);
				
				// work
				var work = $('div.buy a');
				FFS.performClick(work[0]);
				point = point - 40;
			}

			if (point >= 35) {
				var work;
				
				work = $('span.chore_container:eq(2) a');

				FFS.performClick(work[0]);
				
				// friend
				var friend = $('span.friend_container:eq('+ randFriend +') a');
				FFS.performClick(friend[0]);
				
				// work
				var work = $('div.buy a');
				FFS.performClick(work[0]);
				point = point - 35;
			}

			if (point >= 25) {
				var work;
				
				work = $('span.chore_container:eq(5) a');

				FFS.performClick(work[0]);
				
				// friend
				var friend = $('span.friend_container:eq('+ randFriend +') a');
				FFS.performClick(friend[0]);
				
				// work
				var work = $('div.buy a');
				FFS.performClick(work[0]);
				point = point - 25;
			}

			if (point >= 15) {
				var work;
				
				work = $('span.chore_container:eq(1) a');

				FFS.performClick(work[0]);
				
				// friend
				var friend = $('span.friend_container:eq('+ randFriend +') a');
				FFS.performClick(friend[0]);
				
				// work
				var work = $('div.buy a');
				FFS.performClick(work[0]);
				point = point - 15;
			}

			if (point >= 10) {
				var work;
				
				work = $('span.chore_container:eq(3) a');

				FFS.performClick(work[0]);
				
				// friend
				var friend = $('span.friend_container:eq('+ randFriend +') a');
				FFS.performClick(friend[0]);
				
				// work
				var work = $('div.buy a');
				FFS.performClick(work[0]);
			}
			document.alert("Done!");
		
		}
		else {
			document.alert("Done!");
			break;
		}
		document.location.reload();
		}

	},
}

FFS.work();