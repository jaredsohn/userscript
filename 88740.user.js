// ==UserScript==

// @name           FFS AutoWork 100e
// @namespace      http://userscripts.org/scripts/show/24984
// @include        http://apps.facebook.com/friendsforsale/chores*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @version	1.3
// @updated: Mar 24, 2010
// @description    Auto work when energy = 100 order by value

// ==/UserScript==

var FFS = {
	performClick : function(node) {
		var evt = document.createEvent("MouseEvents");
		evt.initEvent("click", true, false);
		node.dispatchEvent(evt);
	},
	
	refresh : function() {
		window.location.reload( false );
	},
	
	nextPage : function() {
		var next = $('#app7019261521_pet_value div.pagination a:last');
		if (next.html() == 'Next') {
			FFS.performClick(next[0]);
			window.setTimeout(FFS.refresh, 6000);
		}
		else {
			alert('DONE');
		}
	},
	
	work : function() {
		FFS.performClick($('div.left_column div.headline ul.filters li:eq(1) a')[0]);
		
		
		var pets = $('#app7019261521_pet_value span.pet_container a');
		pets.each(function(i) {
			var pet = pets.eq(i);
			FFS.performClick(pet[0]);
			
			var energy = $('span.energy', pet).html();
			var point = parseInt(energy.match(/([0-9]+)/i)[1]);
			//var point = parseInt(energy.match(/([0-9]+)/i)); //Thuync update: 2010-03-24
			
			var worked = false;
			
			if (point >= 100) {
				worked = true;
			
				var work;
				
				if (point == 100) {
					// date
					work = $('span.chore_container:eq(0) a');
				}

				FFS.performClick(work[0]);
				
				// friend
				var randFriend = Math.floor(Math.random() * 9);
				var friend = $('span.friend_container:eq('+ randFriend +') a');
				FFS.performClick(friend[0]);
				
				// work
				var work = $('#app7019261521_checkout div.buy a:eq(1)');
				FFS.performClick(work[0]);
			}
			
			if (i == pets.length - 1) {
				FFS.nextPage();
			}
			
			if (worked) {
				return false;
			}
		});
		
	}
}

window.setTimeout(FFS.work, 6000);