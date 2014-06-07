// ==UserScript==
// @name        MH Online Checker
// @namespace   are.mousehunt
// @description Check online of team member
// @downloadURL https://userscripts.org/scripts/source/176281.user.js
// @updateURL   https://userscripts.org/scripts/source/176281.meta.js
// @version     1.2
// @include     http://*.mousehuntgame.com/team.php*
// @include     https://*.mousehuntgame.com/team.php*
// @grant       none
// @require     http://code.jquery.com/jquery.min.js
// @author      are
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);
$(document).ready(function(){
	$('div#hgAppContainer').append('<div id="OnlineCheckerWindow"></div>');
	$('div#OnlineCheckerWindow').css({'background-color':'#ffffff', 'position':'fixed', 'width':'200px', 'height':'120px', 'display':'none', 'z-index':'9999', 'padding':'20px', 'border':'3px solid black'});

	$('div[class="tournamentTabRow tournamentTabRow-white"]').each(function(i){
		var online = $(this).children('div[class="column memberActivity"]');
		if (typeof online != 'undefined' && $(online).html() != '--'){
			var name = $(this).children('div[class="column memberName"]');
			var link = $(name).children('a').attr('href');
			if (typeof link == 'undefined' || link == '') return;
			link = link.substring(link.lastIndexOf("=") + 1, link.length);
			if (link == user.sn_user_id) {
				$(name).hover(
					function(ev) {
						var desc = 'Power: '  + user.trap_power + '<br/>Luck: ' + user.trap_luck + '<br/>Attr Bonus: ' + (user.trap_attraction_bonus * 100) + '&#37;<br/><br/>Weapon: ' + user.weapon_name + '<br/>Base: ' + user.base_name;
						if (user.trinket_quantity > 0) desc += '<br/>Charm: ' + user.trinket_quantity + ' ' + user.trinket_name;
						else desc += '<br/>Charm: ---';
						if (user.bait_quantity > 0) desc += '<br/>Bait: ' + user.bait_quantity + ' ' + user.bait_name;
						else desc += '<br/>Bait: ---';
						$('div#OnlineCheckerWindow').html(desc);
						$('div#OnlineCheckerWindow').css({'top':ev.clientY - 60, 'left':ev.clientX + 50});
						$('div#OnlineCheckerWindow').show();
					}, 
					function(ev) {
						$('div#OnlineCheckerWindow').hide();
					}
				);				
				return;
			}

			var ajax = new Ajax();
			ajax.requireLogin=true;
			ajax.responseType=Ajax.JSON;
			ajax.ondone=function(resp){
				if(resp.success){
					var str = $(online).html() + "<br/>" + resp.users[link].last_active;
					if (resp.users[link].has_puzzle) str = str + " (KR)";
					$(online).html(str);
					$(name).hover(
						function(ev) {
							var desc = 'Power: '  + resp.users[link].trap_power + '<br/>Luck: ' + resp.users[link].trap_luck + '<br/>Attr Bonus: ' + (resp.users[link].trap_attraction_bonus * 100) + '&#37;<br/><br/>Weapon: ' + resp.users[link].weapon_name + '<br/>Base: ' + resp.users[link].base_name;
							if (resp.users[link].trinket_quantity > 0) desc += '<br/>Charm: ' + resp.users[link].trinket_quantity + ' ' + resp.users[link].trinket_name;
							else desc += '<br/>Charm: ---';
							if (resp.users[link].bait_quantity > 0) desc += '<br/>Bait: ' + resp.users[link].bait_quantity + ' ' + resp.users[link].bait_name;
							else desc += '<br/>Bait: ---';
							$('div#OnlineCheckerWindow').html(desc);
							$('div#OnlineCheckerWindow').css({'top':ev.clientY - 60, 'left':ev.clientX + 50});
							$('div#OnlineCheckerWindow').show();
						}, 
						function(ev) {
							$('div#OnlineCheckerWindow').hide();
						}
					);
				}
			}
			var params={"page":0,"view":"search",'locationId':"",'snuid':link,'uh':user.unique_hash};
			ajax.post(callbackurl+"managers/ajax/users/friendbrowser.php",params);
		}
	});
});