// ==UserScript==
// @name           Roster Page Enhancer
// @namespace      rockitsauce
// @description    Player comparison and quick view on roster page
// @include        http://goallineblitz.com/game/roster.pl?team_id=*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js
// @require        http://ajax.googleapis.com/ajax/libs/jqueryui/1.5.2/jquery-ui.min.js 
// ==/UserScript==

$('head')
	.append("<link href='http://goallineblitz.com/css/game/player_attributes.css?2' type='text/css' rel='stylesheet'>"); 
	
$(document).ready( function() {
	var comparer = "<div id='comparer' style='z-index: 9999; position: absolute; display: none;'><table style='background-color: #636363;'><tr><td colspan='2' align='right'><b id='close'>[X]&nbsp;</b></td><tr style='background-color: #636363;'><td><span style='font-size: 10pt; font-weight: bold; color: white;' id='player_one_name'>&nbsp;</span></td><td><span style='font-size: 10pt; font-weight: bold; color: white;' id='player_two_name'>&nbsp;</span></td></tr><tr><td style='width: 320px;'><span id='player_one'>&nbsp;</span></td><td style='width: 320px;'><span id='player_two'>&nbsp;</span><div></td></tr><tr><td><div style='margin: 0 0 5px 60px; padding: 5px 5px 5px 7px; height: 88px; width: 186px; background: transparent url(/images/game/design/scouting_report_bg.png) repeat scroll 0 0;' id='scouting_player_one'></div></td><td><div style='margin: 0 0 5px 60px; padding: 5px 5px 5px 7px; height: 88px; width: 186px; background: transparent url(/images/game/design/scouting_report_bg.png) repeat scroll 0 0;' id='scouting_player_two'></div></td></tr></table></div>";
	var quick_view = "<div class='content_container' id='quick_view' style='width: 320px; z-index: 9999; position: absolute; display: none;'><div style='width: 320px;' id='ratings'></div><div style='margin: 0 0 5px 60px; padding: 5px 5px 5px 7px; height: 88px; width: 186px; background: transparent url(/images/game/design/scouting_report_bg.png) repeat scroll 0 0;' id='scouting'></div></div>";
	$('body').append(quick_view).append(comparer);
	
	// add compare buttons
	var types = ['Offense', 'Defense', 'Kicker'];
	$.each(types, function(i, type) {
		$('.medium_head:contains("' + type + ' Roster")').append("&nbsp;&nbsp;<input type='button' value='Compare Players' id='compare" + type + "' />");
		
		// comparison button click
		$('#compare' + type).click( function() {
			var one_link = $('.players:eq(' + i + ') input:checked:first').next().attr('href');
			var two_link = $('.players:eq(' + i + ') input:checked:last').next().attr('href');
			var one_name = $('.players:eq(' + i + ') input:checked:first').next().html();
			var two_name = $('.players:eq(' + i + ') input:checked:last').next().html();
			
			$.get(one_link, function(data) {
				var ratings = $('.player_stats_table', data).clone();
				var scouting = $('#player_scouting_report', data).clone();
				$('#player_one_name').html(ratings);
				$('#scouting_player_one').html(scouting);
				// add number to scouting report bar
				$('.rating_bar div', $('#scouting_player_one')).each( function() {
					var rate = $(this).width();
					$(this).text(rate);
				});
			});
			
			$.get(two_link, function(data) {
				var ratings = $('.player_stats_table', data).clone();
				var scouting = $('#player_scouting_report', data).clone();
				$('#player_two_name').html(ratings);
				$('#scouting_player_two').html(scouting);
				// add number to scouting report bar
				$('.rating_bar div', $('#scouting_player_two')).each( function() {
					var rate = $(this).width();
					$(this).text(rate);
				});
			});
			
			$('#comparer')
				.css('left', $(this).offset().left + $(this).width() + 5)
				.css('top', $(this).offset().top)
				.show();
		});
	});
	
	// tertiary statement to figure out if on GM team or not
	var player = $('.player_name_short a').length > 0 ? '.player_name_short' : '.player_name';
	
	// add checkboxes
	$(player + ' span:first-child')
		.prepend("<input type='checkbox' id='player' />&nbsp;&nbsp;")
		.click( function() {
			var par = $(this).parent().parent().parent().parent();
			if ($('input:checked', par).length > 2)
				return false;
		});
	
	// quick view
	$(player + ' a').hover(
		function() {
			if ($('#comparer').css('display') == 'block') return;
			
			var link = $(this).attr('href');
			
			$.get(link, function(data) {
				var ratings = $('.player_stats_table', data).clone();
				var scouting = $('#player_scouting_report', data).clone();
				$('#ratings').html(ratings);
				$('#scouting').html(scouting);
				// add number to scouting report bar
				$('.rating_bar div', $('#quick_view')).each( function() {
					var rate = $(this).width();
					$(this).text(rate);
				});
			});
			// set some properties and show
			$('#quick_view')
				.css('left', $(this).offset().left + $(this).width() + 5)
				.css('top', $(this).offset().top - 75)
				.show();
		},
		function() {
			$("#quick_view").hide();
		}
	);
	
	// close comparison frame
	$('#close').click( function() {
		$('#comparer').hide();
	}).css('cursor', 'pointer');
});