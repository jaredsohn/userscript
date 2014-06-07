// ==UserScript==
// @name           Autosort RescueTime
// @namespace      J.R. Willett
// @description    I can't live without autosorting any longer!
// @include        https://www.rescuetime.com/browse/*/by/rank/*
// ==/UserScript==

String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g,'');
}

function set_cookie(name,value) 
{
	if( value.toString().indexOf(';') >= 0 )
		alert('Sorry, I am lazy so you cannot save a filter with a semicolon in it.');
	else
		document.cookie = name + '=' + value + '; path=' + cookie_url;
}

function read_cookie(name) 
{
	var search_for = name + "=";
	var split_cookies = document.cookie.split(';');
	for(var i = 0; i < split_cookies.length; i++ ) 
	{
		var this_cookie = split_cookies[i];
		this_cookie = this_cookie.trim();
		if( this_cookie.indexOf(search_for) == 0 ) 
			return this_cookie.substring( search_for.length, this_cookie.length );
	}
	return null;
}

function add_padding(thing_to_pad, num_digits)
{
	var ret_val = thing_to_pad.toString();
	while(ret_val.length < num_digits)
		ret_val = '0' + ret_val;
	return ret_val;
}


// Return first instance of element with matching tag and class
function getElementByTagAndClass( tag_name, class_name, obj ) 
{
	var return_val = null;
	var i = 0;
    if ( obj.tagName && obj.className && obj.tagName.toUpperCase() == tag_name.toUpperCase() && 
								obj.className.toUpperCase() == class_name.toUpperCase() ) 
        return_val = obj;
	else
		while ( i < obj.childNodes.length && return_val === null )
			return_val = getElementByTagAndClass( tag_name, class_name, obj.childNodes[i++] );

	return (return_val);
}



var filter;
var location_key = document.getElementById('recognized_page_title').innerHTML.trim();
var this_url = document.location.toString();
var cookie_url = this_url.substring(this_url.indexOf('/browse/'), this_url.indexOf('/by/rank/for/') + 13);
var entity_category;
var activity_start = this_url.indexOf('/activity/');
if(activity_start >= 0)
{
	//Get the activity being viewed
	var temp_url = this_url.substring(activity_start+10, this_url.length);
	var activity_end = temp_url.indexOf('/');
	entity_category = temp_url.substring(0,activity_end);
}
else
	entity_category = -1;
var body_table = getElementByTagAndClass( 'table', 'report', document.body, 0 );
var body_html = body_table.innerHTML;
var sidebar_div = document.getElementById('sidebar-container');
var sidebar_html = sidebar_div.innerHTML;
var last_td_start = body_html.lastIndexOf('</td>');
var rank_th_start = body_html.indexOf('<th width="1px">Rank</th>');
var entities = unsafeWindow.entities;
var productivities_by_score = unsafeWindow.productivities_by_score;
var reload_timer_active = false;
const INITIAL_TIMER_MINUTES = (20);
const INITIAL_TIMER_SECONDS = (60*INITIAL_TIMER_MINUTES);
var timer_seconds_remaining = INITIAL_TIMER_SECONDS;
//var all_words = new Object();

// Insert my filthy little filtering divs
sidebar_html = sidebar_html + 
			'<div id=jrw_filters>Loading Filters . . . </div>\n' + 
			'<div id=jrw_timeleft></div>\n' + 
			'<div id=jrw_filter_msgs></div>\n';

// Insert my filthy little checkbox header
body_html = body_html.substring(0, rank_th_start-1) + 
			'<th width="1px"><input type=checkbox id=jrw_check_all></th>' + 
			body_html.substring(rank_th_start, body_html.length);

body_table.innerHTML = body_html;
sidebar_div.innerHTML = sidebar_html;
//alert(body_html);
// Watch for check_all to change
document.getElementById('jrw_check_all').addEventListener('change',set_all_checks,true);


function create_new_filter()
{
	var index = filter.length;
	filter[index] = new Object();
	filter[index].filter_string = '';
	filter[index].score = 0;
	display_filter_data();
}

function set_productivity( entity_id, sub_entity_id, new_score ) {
  var entity = entities[entity_id];  
  if( typeof entity == 'undefined' ) {entity = entities[sub_entity_id];}
  //alert( entity_id + ',' + sub_entity_id + ',' + new_score);
  entity.score = new_score;
  unsafeWindow.update_productivity_links( entity, entity_id, sub_entity_id, true );
  return false;
}


function display_filter_data()
{
	
	if(body_table !== null)
	{
		var filter_html = '';

		filter_html += '<br><br>Filters for "' + location_key + '":<br><br>\n';
		if( filter.length == 0 )
		{
			filter_html += '(No filters yet)';
		}
		else
		{
			filter_html += '<table border=1><tr><td align=center><b>Things Containing</b></td>';
			filter_html += '<td align=center valign=center><b>Are</b></td></tr>\n';
			for ( i = 0; i < filter.length; i++ )
			{
				filter_html += '<tr><td><input type=text size=14 id=jrw_flt_name' + i + ' value="' + filter[i].filter_string + '"></td>\n';
				filter_html += '<td><select id=jrw_flt_score' + i + ' style="width: 60px">';
				for (var j=2; j >= -2; j-- )
				{
					filter_html += '<option value=' + j.toString();
					if ( j == filter[i].score)
						filter_html += ' selected';
					filter_html += '>' + productivities_by_score[j].name + '</option>';
				}
				filter_html += '</td></tr>\n';
			}
			filter_html += '</table>\n';
		}
		filter_html += '<br><input type=button value="New Filter" id=jrw_create_new_filter>\n';
		filter_html += '&nbsp;<input type=button value="Save&Apply" id=jrw_save_and_apply_filters><br>\n';

		//filter_html += '<br><br>\n';

		document.getElementById('jrw_filters').innerHTML = filter_html;

		document.getElementById('jrw_create_new_filter').addEventListener('click',create_new_filter,true);
		document.getElementById('jrw_save_and_apply_filters').addEventListener('click',save_and_apply_filters,true);
	}
	else
	{
		//alert('table with class=body not found!');
	}
}

function apply_filters()
{
	var filter_html = '';
	var done_filtering = false;
	var these_words = ""
	var this_score = 0;
	var this_entity_id;
	var this_sub_entity_id;

	for(entity_index in entities)
	{  
		these_words = entities[entity_index].display_name;
		these_words_uc = these_words.toUpperCase();
		this_score = entities[entity_index].score;
		if(entity_category == -1)
		{
			this_entity_id = entities[entity_index].id;
			this_sub_entity_id = -1
		}
		else
		{
			this_entity_id = entity_category;
			this_sub_entity_id = entities[entity_index].id;
		}
		/*
		filter_html += '<br>Entity #' + entity_index + '<br>\n';
		for( thingy in entities[entity_index] )
		{
			filter_html += '	' + thingy + ' = ' + entities[entity_index][thingy] + '<br>\n';
		}
		*/
		
		i = 0;
		done_filtering = false;
		while ( i < filter.length && !done_filtering )
		{
			if( filter[i].filter_string.trim().length > 0 && 
						these_words_uc.indexOf(filter[i].filter_string.toUpperCase()) >= 0 )
			{
				if( this_score != filter[i].score )
				{
					set_productivity( this_entity_id, this_sub_entity_id, filter[i].score);
					filter_html += '<br><br>Found "' + filter[i].filter_string + '" in "' + these_words + '".<br>\n';
					filter_html += 'Score changed from ' + this_score + ' to ' + filter[i].score + '.<br>\n';
				}
				done_filtering = true;
			}
			else
			{
				//filter_html += '<br><br>Did not find "' + filter[i].filter_string + '" in "' + these_words + '".<br>\n';
			}
			i++;
		}
		/*
		// Remove punctuation and extra whitespace, and split into individual words
		split_words = these_words.replace(/[\W]+/g, ' ').split(' ');
		for ( var i = 0; i < split_words.length; i++ )
		{
			if(all_words[split_words[i]])
				all_words[split_words[i]]++;
			else
				all_words[split_words[i]] = 1;
		}
		*/
	}

	if(filter.length > 0)
	{
		filter_html += '<br><br>Filters Applied.';
	}
	
	document.getElementById('jrw_filter_msgs').innerHTML = filter_html;
}

function save_filters()
{
	GM_setValue(location_key + '_NumFilters', filter.length);
	GM_setValue(location_key + '_ReloadTimerActive', reload_timer_active);
	for( var i = 0; i < filter.length; i++ )
	{
		GM_setValue(location_key + '_FilterString' + i, filter[i].filter_string);
		GM_setValue(location_key + '_FilterScore' + i, filter[i].score);
	}
}

function load_filters_from_cookies()
{
	var num_filters = read_cookie('jrw_NumFilters');
	// num_filters gets corrupted sometimes, so throw it away and determine it dynamically
	num_filters = 0;

	filter = new Array();
	//alert(document.cookie.toString());
	var timer_active = read_cookie('jrw_ReloadTimerActive');
	if( timer_active === null )
		reload_timer_active = false;
	else if( timer_active == 'true')
		reload_timer_active = true;
	else
		reload_timer_active = false;
	
	var num_missing = 0;
	var new_index = 0;
	var cookie_index = 0;
	while(num_missing < 10)
	{
		var this_string = read_cookie('jrw_FilterString' + cookie_index);
		var this_score = read_cookie('jrw_FilterScore' + cookie_index);
		//alert(i + ": " + this_string);
		if( this_string !== null && this_score !== null )
		{
			filter[new_index] = new Object();
			filter[new_index].filter_string = this_string;
			filter[new_index].score = this_score;
			new_index++;
			num_missing = 0;
		}
		else
			num_missing++;
		cookie_index++;
	}
}

function load_filters()
{
	var num_filters = GM_getValue(location_key + '_NumFilters', null);
	if( num_filters == null )
		load_filters_from_cookies();
	else
	{
		filter = new Array();
		var timer_active = GM_getValue(location_key + '_ReloadTimerActive', null);
		if( timer_active === null )
			reload_timer_active = false;
		else if( timer_active == true)
			reload_timer_active = true;
		else
			reload_timer_active = false;
		
		var num_missing = 0;
		var new_index = 0;
		var cookie_index = 0;
		while(num_missing < 10)
		{
			var this_string = GM_getValue(location_key + '_FilterString' + cookie_index, null);
			var this_score = GM_getValue(location_key + '_FilterScore' + cookie_index, null);
			//alert(i + ": " + this_string);
			if( this_string !== null && this_score !== null )
			{
				filter[new_index] = new Object();
				filter[new_index].filter_string = this_string;
				filter[new_index].score = this_score;
				new_index++;
				num_missing = 0;
			}
			else
				num_missing++;
			cookie_index++;
		}

	}
}

function delete_filter( filter_index )
{
	// Move everybody down one
	var i = filter_index;
	while ( i < filter.length - 1 )
	{
		filter[i] = filter[i + 1]
		i++
	}
	filter.splice(filter.length-1, 1);
}

function save_and_apply_filters()
{
	var this_obj;
	var i;
	var need_to_redisplay = false;
	for ( i = 0; i < filter.length; i++)
	{
		this_obj = document.getElementById('jrw_flt_name' + i);
		filter[i].filter_string = this_obj.value;
		this_obj = document.getElementById('jrw_flt_score' + i);
		filter[i].score = this_obj.value;
	}

	// First trim, then delete blank filters
	i = 0;
	while ( i < filter.length )
	{
		filter[i].filter_string = filter[i].filter_string.trim();
		if( filter[i].filter_string.length == 0 )
		{
			delete_filter(i);
			need_to_redisplay = true;
		}
		else
			i++;
	}
	if( need_to_redisplay )
		display_filter_data();
	apply_filters();
	save_filters();
}

function timer_change()
{
	this_checkbox = document.getElementById('jrw_reload_checkbox');
	if(this_checkbox.checked) 
		reload_timer_active = true;
	else
		reload_timer_active = false;
	timer_seconds_remaining = INITIAL_TIMER_SECONDS;
	save_filters()
	update_timer()
}

function update_timer()
{
	var timer_html = '';
	var this_obj;
	timer_html += '<br><input type=checkbox id=jrw_reload_checkbox';
	if( reload_timer_active )
	{
		timer_html += ' checked';
		timer_seconds_remaining = timer_seconds_remaining - 1;
		if( timer_seconds_remaining <= 0 )
		{
			timer_seconds_remaining = 0;
			unsafeWindow.location.reload();
		}
		else
			setTimeout(update_timer, 1000);
	}
	var minutes_remaining = parseInt(timer_seconds_remaining / 60);
	var seconds_remaining = timer_seconds_remaining % 60;
	time_remaining = minutes_remaining + ':' + add_padding(seconds_remaining, 2);
	timer_html += '> Get new data in ' + time_remaining + ' mins';
	document.getElementById('jrw_timeleft').innerHTML = timer_html;
	document.getElementById('jrw_reload_checkbox').addEventListener('change',timer_change,true);
}


function add_checkboxes()
{
	var i = 1;
	var this_id;
	var this_tr;
	var td_start;
	for(entity_index in entities)
	{  
		this_id = entities[entity_index].id;
		this_tr = document.getElementById(i.toString() + '_' + this_id.toString());
		this_html = this_tr.innerHTML.toString();
		td_start = this_html.indexOf('<td>');
		this_html = this_html.substring(0, td_start - 1) + 
						'<td align=center><input type=checkbox id=jrw_check' + i.toString() + '></td>' + 
						this_html.substring(td_start, this_html.length);
		this_tr.innerHTML = this_html;
		if(i == 1) 
		{
			//alert(td_start.toString() + ':' + this_html);
		}
		i++;
	}
}

function set_all_checks()
{
	var i = 1;
	var new_checked = document.getElementById('jrw_check_all').checked;
	for(entity_index in entities)
	{  
		document.getElementById('jrw_check' + i.toString()).checked = new_checked;
		i++;
	}
}

load_filters();
display_filter_data();
apply_filters();
update_timer();
add_checkboxes();