// ==UserScript==
// @name           Free Agent Page Enhancer
// @namespace      rockitsauce
// @description    Enhancements to the Free Agent Page: Player comparison
// @include       http://goallineblitz.com/game/market_free_agents.pl
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js
// @require        http://ajax.googleapis.com/ajax/libs/jqueryui/1.5.2/jquery-ui.min.js 
// ==/UserScript==

$('head').append("<link href='http://goallineblitz.com/css/game/player_attributes.css?2' type='text/css' rel='stylesheet'>"); 

$(document).ready( function() {
	var comparer = "<div id='comparer' style='z-index: 9999; position: absolute; display: none;'><table><tr style='background-color: #636363;'><td colspan='2' align='right'><b id='close'>[X]&nbsp;</b></td><tr style='background-color: #636363;'><td><span style='font-size: 10pt; font-weight: bold; color: white;' id='player_one_name'>&nbsp;</span></td><td><span style='font-size: 10pt; font-weight: bold; color: white;' id='player_two_name'>&nbsp;</span></td></tr><tr><td style='width: 320px;'><span id='player_one'>&nbsp;</span></td><td style='width: 320px;'><span id='player_two'>&nbsp;</span><div></td></tr></table></div>";
	$('body').append(comparer);
	$('.medium_head:contains("Search Results")').append("&nbsp;&nbsp;<input type='button' value='Compare Players' id='compare' />");

	$("img[src$='line_light.gif']").after("&nbsp;&nbsp;<input type='checkbox' id='player' />");
	$(':checkbox').click( function() {
		if ($('input:checked').length > 2)
			return false;
		}
	);

	$('#compare').click( function() {
		var one_link = $('input:checked:first').parent().next().children('a').attr('href');
		var two_link = $('input:checked:last').parent().next().children('a').attr('href');
		var one_name = $('input:checked:first').parent().next().children('a').html();
		var two_name = $('input:checked:last').parent().next().children('a').html();
		
		$('#player_one').load(one_link + " .player_stats_table");
		$('#player_two').load(two_link + " .player_stats_table");
		$('#player_one_name').html(one_name);
		$('#player_two_name').html(two_name);
		
		$('#comparer')
			.css('left', $(this).offset().left + $(this).width() + 5)
			.css('top', $(this).offset().top)
			.show();
	});
	
	$('#close').click( function() {
		$('#comparer').hide();
	}).css('cursor', 'pointer');
});