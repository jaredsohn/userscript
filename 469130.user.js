// ==UserScript==
// @name		Starfleet Commander Hired Guns Territory Tracker
// @description Maps which territory types are associated with which player colonies.
// @namespace   http://www.callmegavin.com
// @require	 http://code.jquery.com/jquery-1.11.0.min.js
// @include	 http://guns.playstarfleet.com/*
// @version	 1.04
// @grant	   none
// ==/UserScript==

// Only use jQuery defined in @require above
this.$ = this.jQuery = jQuery.noConflict(true);

// Array of territory types used to get image srcs and set title attriubutes.
var territories = new Array();
territories[0] = 'alien_experiment';
territories[1] = 'alien_space_dock';
territories[2] = 'missile_silo';
territories[3] = 'labor';
territories[4] = 'resource_vault';
territories[5] = 'advanced_factory';

// For contructing image src url's
var t_imgs_dir = 'http://guns.playstarfleet.com/images/starfleet/planets/';
var t_img_src_ext = '_1.png';

// Move stuff down to make room for territory tracker bar
$('#header .resources').css('top', '216px');
$('#content').css('margin-top', '56px');

var t_selected = 1.0;
var t_deselected = 0.1;

// Get territory tracking mappings from cookie; create cookie if it doesn't already exist
var now = new Date();
var time = now.getTime();
time += 365 * 24 * 3600 * 1000;
now.setTime(time);
if(!document.cookie.match(/t_tracker=/))
{
    document.cookie = 't_tracker=||||||||; path=/; expires=' + now.toUTCString();
}
var tracker_data = get_tracker_data();

// Build territory tracker bar
$('#user_planets').append('<div id="t_tracker" style="height:48px;width:666px;padding:0;background:#333333;clear:both"></div>');
$('#user_planets .planet').each(function(planet){
	$('#t_tracker').append('<div id="plnt' + planet + '" style="float:left;height:48px;width:73px;border-right:1px solid black"></div>');
	for(i = 0; i < 6; i++)
	{
		var opacity = t_deselected;
		var regex = new RegExp(i);
		if(tracker_data[planet].match(regex))
		{
			opacity = t_selected;
		}
		$('#plnt' + planet).append('<img id="t_plnt' + planet + 't_img' + i + '" title="' + territories[i] + '" src="' + t_imgs_dir + territories[i] + t_img_src_ext + '" style="width:24px" />');
		$('#t_plnt' + planet + 't_img' + i).css('opacity', opacity);
		$('#t_plnt' + planet + 't_img' + i).click(function() {
			if($(this).css('opacity') == t_deselected)
			{
				$(this).css('opacity', t_selected);
			}
			else
			{
				$(this).css('opacity', t_deselected);
			}
			update_cookie(t_selected, t_deselected);
		});
		if(i == 2)
		{
			$('#plnt' + planet).append('<br />');
		}
	}
});

function get_tracker_data()
{
    var tracker_data = new Array();
    var cookie_array = document.cookie.split(';');
    for(var cookie = 0; cookie < cookie_array.length; cookie++)
    {
        if(cookie_array[cookie].match(/t_tracker/))
        {
            var name_value = cookie_array[cookie].split('=');
            tracker_data = name_value[1].split('|');
        }
    }
    return tracker_data;
}

function update_cookie(t_selected, t_deselected)
{
	var cookie_data = '';
	for(var planet = 0; planet < 9; planet++)
	{
		for(var territory = 0; territory < 6; territory++)
		{
			if($('#t_plnt' + planet + 't_img' + territory).css('opacity') == t_selected)
			{
				cookie_data = cookie_data + String(territory);
			}
		}
		if(planet < 8)
		{
			cookie_data = cookie_data + '|';
		}
	}
    document.cookie = 't_tracker=' + cookie_data + '; path=/; expires=' + now.toUTCString();
}