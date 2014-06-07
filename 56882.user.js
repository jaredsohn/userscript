// ==UserScript==
// @name           WoWArmory character sheet item level charting
// @namespace      urn:uuid:a219d7f0-96a0-11de-8a39-0800200c9a66
// @include        http://www.wowarmory.com/character-sheet.xml*
// @require        http://code.jquery.com/jquery-1.3.2.min.js
// ==/UserScript==

//var COLOR = ['#5B5B5B', '#ffffff', '#007200', '#004385', '#5D1F88', '#C24E00', '#9C884D', '#e5cc80', '#7e7046'];
var COLOR = ['#919191', '#ffffff', '#00A900', '#0062C3', '#B343FF', '#FA9900', '#9C884D', '#e5cc80', '#7e7046'];

var $profile = $('#gear-profile');
if($profile.hasClass('list_active')){
	setTimeout(function(){makeChart();}, 250);
}else if($profile.hasClass('detail_active')){
	$('.toggle_gear_list', $profile)
		.bind('click', function(){
			makeChart();
			$(this).unbind('click');
		});
}

function makeChart(){
	var maxwidth = $('#gear-profile .gear_list_table').width();
	var $gears = $('#gear-profile tr').not(':first');
	
	var ilvls = $gears.find('.glist_ilvl').map(function(){
		return this.textContent;
	}).get();
	var maxilvl = Math.max.apply(Math, ilvls);
	
	$gears.each(function(index){
		var color = COLOR[$('.glist_name span', this).attr('class').match(/\d/)];
		var width = ilvls[index] / maxilvl * maxwidth;
		
		var $bar = $('<div/>');
		$bar
			.css({
				'position': 'absolute',
				'top': '24px',
				'left': '0',
				'background-color': color,
				//'opacity': '0.9',
				'-moz-box-shadow': '2px -2px 4px ' + color})
			.width(0)
			.height(1)
			.animate({'width': width + 'px'}, width / maxwidth * 5000);
		$(this)
			.children('td:first')
				.prepend('<div/>')
				.children('div:first')
					.css('position', 'relative')
					.append($bar);
	});
}
