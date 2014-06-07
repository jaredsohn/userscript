// ==UserScript==
// @name           Home Page Enhancer
// @namespace      rockitsauce
// @description    Enhancements to the Home Page: Online friends count, Actual game start time.
// @include       http://goallineblitz.com/game/home.pl
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js
// @require        http://ajax.googleapis.com/ajax/libs/jqueryui/1.5.2/jquery-ui.min.js 
// ==/UserScript==

// SETTINGS FOR YOU TO CHANGE!!!!!!
// your settings.  anything you do not want to display set to false or change the number (number can be negative).  
// do not edit the height function, and do not remove any items.
//  ======== Instructions for the load setting ===========
//  All players to load on page load ~ load: true
//  Specify certain players to load on page load ~ load: ['Player One', 'Player Two', 'etc']
// Specify no players to load on page load ~ load: false

var settings = {
	load: false,
	game_time: false,
	cash: false,
	bonus: false,
	shopping: false,
	morale: false,
	build: false,
	fame: false,
	contract: false,
	wait_list: true,
	friends: true,
	time_zone_offset: 3,
	height: function() {
		var ctr = 159;
		var all = ['cash', 'bonus', 'shopping', 'morale', 'contract'];
		$.each(all, function(i, setting) {
			ctr += settings[setting] ? 14 : 0;
		});
		return ctr;
	}
}
// END SETTINGS TO BE CHANGED

$(document).ready( function() {
	
	var methods = {
		alterDateTime: function(ctl) {
			var str = $(ctl).text();
			var start = str.lastIndexOf("in") + 3;
			var end = str.lastIndexOf(")");
			var timer = str.substring(start, end);
			
			// get time til
			var split = timer.split(":");
			var hours = (parseInt(split[0]) + settings.time_zone_offset) * 3600000;
			var mins = parseInt(split[1]) * 60000;
			var secs = parseInt(split[2]) * 1000;
			var milli = hours + mins + secs;
			
			// add time til to default time
			var cur = new Date();
			var total = cur.getTime() + milli;
			
			// set upcoming game time
			var game = new Date();
			game.setTime(total);
			
			// handle non-military time telling deficiencies
			var hour = game.getHours() > 12 ? hour = game.getHours() - 12 : game.getHours();
			var meridian = game.getHours() > 12 ? " PM" : " AM";
			var real_time = hour + ":" + "00" + meridian;
			
			// stick it on the site
			var replacer = $(ctl).text().match("vs") == null ? "at" : "vs";
			var new_html = $(ctl).html().replace(replacer, real_time + " " + replacer);
			$(ctl).html(new_html);
		}
	};
	// friend count
	if (settings.friends)
		$('#tab_friends a').append(" (" + $('.online').length + ")");
	
	// change background color repeat for boostable players
	$('.content_container_sp').css('background', 'transparent url(/images/game/design/special_background.gif)');
	
	$('.player_box_vet').each( function() {
		if (settings.load === false) return;

		$(this).css('height', settings.height() + 'px');
		
		var player = $('a:first', this);
		var link = player.attr('href');
		var player_name = player.text();
		
		// exit if player not in array
		var carry_on = true;
		if (settings.load !== true) {
			$.each(settings.load, function(i, name) {
				if (name == player_name)
					carry_on = false;
			});
		}
		if (!carry_on) return;
		
		var player_id = link.split("id=")[1];
		var section = $('.playerhead', this);
		
		//methods.addPlayerDataHolders($(this).html());
		var vitals = $('.player_vitals', this);	
		if (settings.morale)
			vitals.append("<tr><td class='player_vital_head'>Morale:</td><td class='rating_bar' id='morale'></td></tr>");
		if (settings.contract)
			vitals.append("<tr><td class='player_vital_head'>Contract:</td><td id='contract'></td></tr>");
		if (settings.cash)
			vitals.append("<tr><td class='player_vital_head'>Cash:</td><td id='cash'></td></tr>");
		if (settings.bonus)
			vitals.append("<tr><td class='player_vital_head' style='white-space: nowrap;'>Bonus Tokens:</td><td id='bonus'></td></tr>");
		if (settings.shopping)
			vitals.append("<tr><td class='player_vital_head' style='white-space: nowrap;'>Shopping Tokens:</td><td id='shopping'></td></tr>");
		
		$.get(link, function(data) {
			var cash = $('.player_money', data).html();
			var bonus = $('.player_points_value', data).children('td').eq(3).html();
			var shopping = $('.player_points_value', data).children('td').eq(4).html();
			var morale = $('.rating_head:contains("Morale:")', data).next().html();
			var build = $("input[name='allow_manager_view']", data).val();
			var fame = $('.current_stats_fame', data).text();
			var contract = $('.vital_data:contains("Exp")', data).text();
			
			$('#cash', $(section).next()).html(cash);
			$('#bonus', $(section).next()).html("<a href='http://goallineblitz.com/game/bonus_tokens.pl?player_id=" + player_id + ">" + bonus + "</a>");
			$('#shopping', $(section).next()).html("<a href='http://goallineblitz.com/game/adv_equipment.pl?player_id=" + player_id + ">" + shopping + "</a>");
			$('#morale', $(section).next()).html(morale);
			$('#contract', $(section).next()).html(contract);
			$(section).append("<span id='fame' style='font-size: 9.5pt;'>&nbsp;&nbsp;[fame: " + fame + " ]</span>");
		});
	});
	
	// wait list position
	if (settings.wait_list) {
		$('#my_account_content').append("<tr><td colspan='2' id='wait_list'></td></tr>");
		$.get("http://goallineblitz.com/game/buy_team.pl", function(data){
			var container = $('div.content_container', data);
			var position = container.text().split('Pro');
			if (position[0].indexOf("Flex Point Cost: 1000 Points") == -1)
				$('#wait_list').html("<br /><a href='http://goallineblitz.com/game/buy_team.pl'>" + position[0] + "</a>");
		});
	}
	
	if (settings.game_time) {
		$('.team_next_game').each( function() {
			methods.alterDateTime(this)
		});
		
		var players = $('.player_vital_head:contains("Next Game:")').next();
		players.each( function(ctl) {
			methods.alterDateTime(this)
		});
	}
});