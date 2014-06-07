// ==UserScript==
// @name            Easy Battle Countdown
// @namespace       http://userscripts.org/users/424220/scripts
// @author          SUPERGADGET
// @version         1.2
// @uso:version     1.2
// @include         http://www.erepublik.com/*/military/campaigns
// @description     Erepublik script that shows all battle countdown timers and campaign points (v 1.2) on the Military campaigns page
// ==/UserScript==
if(document.location.href.match(/http:\/\/www.erepublik.com\/.+\/military\/campaigns/)) {

	function get_counter(li)
	{
		var battleId = li.attr('id').split('-')[1];
		var url = '/en/military/battlefield/'+battleId;
		jQuery.ajax({
			url: url,
			dataType: 'html',
			success: function(data) {
				var tank_element = li.find('.tank_img');
				var a_style = 'background: none; margin: 14px 0 0 0;';
				var span_style = 'border-radius: 5px 5px 5px 5px;';
				
				try{
					var counter = data.split(/zoneElapsedTime/)[1].split(/"/)[1];
				}
				catch(e){
					tank_element.before('<a href="'+url+'" class="county" style="'+a_style+' padding: 0 5px;">\
						<span style="'+span_style+'">Choose side</span>\
					</a>');
					tank_element.remove();
					return;
				}
				
				// Campain points
				var leftCountryName = li.find('img.side_flags').eq(0).attr('title');

				var leftPoints = jQuery(data).find('#left_campaign_points strong').html();
				var rightPoints = jQuery(data).find('#right_campaign_points strong').html();
				var leftCountryNamePoints = jQuery(data).find('.country h3').eq(0).html().replace('Resistance Force of ','').trim();
				
				if(leftCountryName != leftCountryNamePoints)
				{
					var tmp = leftPoints;
					leftPoints = rightPoints;
					rightPoints = tmp;
				}
				tank_element.before('<a href="'+url+'" class="county" style="'+a_style+' padding: 0 0 0 10px;">\
						<span style="'+span_style+'">'+leftPoints+'</span>\
					</a>');
				tank_element.after('<a href="'+url+'" class="county" style="'+a_style+' padding: 0 10px 0 0;">\
						<span style="'+span_style+'">'+rightPoints+'</span>\
					</a>');
				// Campain points END
				
				tank_element.after('<a href="'+url+'" class="county" style="'+a_style+' padding: 0 5px;">\
						<span style="'+span_style+'">'+counter+'</span>\
					</a>');
				tank_element.remove();
			}
		});
	}
	
	var p;
	if(window.opera || window.navigator.vendor.match(/Google/)) {
		var div = document.createElement("div");
		div.setAttribute("onclick", "return window;");
		p = div.onclick();
	}
	else
	{
		p = unsafeWindow;
	}
	var jQuery = p.jQuery;

	jQuery(document).ready(function()
	{
		jQuery('#battle_listing .bod_listing li').each(function() {
			get_counter(jQuery(this));
		});
		jQuery('#battle_listing .country_battles li').each(function() {
			get_counter(jQuery(this));
		});
		jQuery('#battle_listing .allies_battles li').each(function() {
			get_counter(jQuery(this));
		});
		jQuery('#battle_listing .all_battles li').each(function() {
			get_counter(jQuery(this));
		});
	});
}
