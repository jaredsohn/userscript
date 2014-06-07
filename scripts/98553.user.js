// ==UserScript==
// @name           Pimped Mining
// @namespace      dacoinminster
// @description    Here be some improvements to slush's mining webpage
// @include        http*://mining.bitcoin.cz/*
// ==/UserScript==


var reload_timer_active = false;
var unhide_comments = false;
var show_date = true;
var show_totals = false;
var show_xstats = false;
var show_xhist = false;
var time_offset = 0;

function set_cookie(name,value) 
{
	// Make cookie expire in one year
	var now = new Date();
	var time = now.getTime();
	time += 365 * 24 * 60 * 60 * 1000;
	now.setTime(time);

	document.cookie = name + '=' + value + 
						'; expires=' + now.toGMTString() + 
						'; path=/';
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

String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g,'');
}


function add_padding(thing_to_pad, num_digits)
{
	var ret_val = thing_to_pad.toString();
	while(ret_val.length < num_digits)
		ret_val = '0' + ret_val;
	return ret_val;
}

function save_setting(name, value)
{
	if(navigator.userAgent.toLowerCase().indexOf('chrome') > -1)
		set_cookie('pimp_' + name, value);
	else
		GM_setValue(name, value);
}

function read_setting(name)
{
	var value;
	if(navigator.userAgent.toLowerCase().indexOf('chrome') > -1)
		value = read_cookie('pimp_' + name);
	else
		value = GM_getValue(name, null);
	//alert(name + '=' + value);
	return value;
}

function save_stuff()
{
	save_setting('ReloadTimerActive', reload_timer_active);
	save_setting('UnhideComments', unhide_comments);
	save_setting('TimeOffset', time_offset);
	save_setting('ShowDate', show_date);
	save_setting('ShowTotals', show_totals);
	save_setting('ShowXStats', show_xstats);
	save_setting('ShowXHist', show_xhist);
}


function load_stuff()
{
	var value = read_setting('ReloadTimerActive', null);
	if( value === null )
		reload_timer_active = false;
	else if( value == true || value == "true" )
		reload_timer_active = true;
	else
		reload_timer_active = false;
	value = read_setting('UnhideComments', null);
	if( value === null )
		unhide_comments = false;
	else if( value == true || value == "true" )
		unhide_comments = true;
	else
		unhide_comments = false;
	time_offset = read_setting('TimeOffset', null);
	if(time_offset == null)
		time_offset = 0;
	value = read_setting('ShowDate', null);
	if( value === null )
		show_date = true;
	else if( value == false || value == "false" )
		show_date = false;
	else
		show_date = true;
	value = read_setting('ShowTotals', null);
	if( value === null )
		show_totals = false;
	else if( value == true || value == "true" )
		show_totals = true;
	else
		show_totals = false;
	value = read_setting('ShowXStats', null);
	if( value === null )
		show_xstats = false;
	else if( value == true || value == "true" )
		show_xstats = true;
	else
		show_xstats = false;
	value = read_setting('ShowXHist', null);
	if( value === null )
		show_xhist = false;
	else if( value == true || value == "true" )
		show_xhist = true;
	else
		show_xhist = false;
}

function timer_change()
{
	this_checkbox = document.getElementById('pimp_reload_checkbox');
	if(this_checkbox.checked) 
		reload_timer_active = true;
	else
		reload_timer_active = false;
	timer_seconds_remaining = INITIAL_TIMER_SECONDS;
	save_stuff();
	update_timer();
}

function unhide_change()
{
	this_checkbox = document.getElementById('pimp_unhide_checkbox');
	if(this_checkbox.checked) 
		unhide_comments = true;
	else
		unhide_comments = false;
	save_stuff();
	unsafeWindow.location.reload();
}

function showdate_change()
{
	this_checkbox = document.getElementById('pimp_showdate_checkbox');
	if(this_checkbox.checked) 
		show_date = true;
	else
		show_date = false;
	save_stuff();
	unsafeWindow.location.reload();
}

function showtotals_change()
{
	this_checkbox = document.getElementById('pimp_showtotals_checkbox');
	if(this_checkbox.checked) 
		show_totals = true;
	else
		show_totals = false;
	save_stuff();
	unsafeWindow.location.reload();
}

function showxstats_change()
{
	this_checkbox = document.getElementById('pimp_showxstats_checkbox');
	if(this_checkbox.checked) 
		show_xstats = true;
	else
		show_xstats = false;
	save_stuff();
	//unsafeWindow.location.reload();
}

function showxhist_change()
{
	this_checkbox = document.getElementById('pimp_showxhist_checkbox');
	if(this_checkbox.checked) 
		show_xhist = true;
	else
		show_xhist = false;
	save_stuff();
	unsafeWindow.location.reload();
}

function offset_change()
{
	time_offset = document.getElementById('pimp_offset_text').value;
	if((time_offset - 0) == time_offset && time_offset.length > 0)
	{
		save_stuff();
		unsafeWindow.location.reload();
	}

}

function update_timer()
{
	var timer_html = '';
	var this_obj;
	timer_html += '<p><label for="id_auto_refresh">Auto-refresh:</label><input type=checkbox id=pimp_reload_checkbox';
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
	timer_html += ' /> Reload page in ' + time_remaining + ' mins</p>';
	document.getElementById('pimp_timeleft').innerHTML = timer_html;
	document.getElementById('pimp_reload_checkbox').addEventListener('change',timer_change,true);
}

var this_url = document.location.toString();

load_stuff();

var content_html;

if( show_xhist )
	document.getElementById('menu').innerHTML = document.getElementById('menu').innerHTML.replace(/\"\/stats\/\"/g,'\'/stats/?history=60\'');

if (this_url.indexOf('accounts/profile/') > -1 && this_url.indexOf('/worker-edit/') == -1 && this_url.indexOf('/login/') == -1)
{
	const INITIAL_TIMER_MINUTES = (20);
	const INITIAL_TIMER_SECONDS = (60*INITIAL_TIMER_MINUTES);
	var timer_seconds_remaining = INITIAL_TIMER_SECONDS;

	content_html = document.getElementById('content').innerHTML;

	//Add my filthy stuff to the content div
	content_html =  content_html + '<h2>Extra Settings by DaCoinMinster</h2>' +
					'<form action="" method="post"><div id=pimp_timeleft></div>' + 
					'<p><label for="id_unhide">Unhide columns:</label><input type=checkbox id=pimp_unhide_checkbox';
	if( unhide_comments )
	{
		content_html += ' checked';
	}
	content_html += ' /> Show difficulty and MHash/Sec</p>\n' + 
					'<p><label for="id_offset">Time offset:</label><input type=text id=pimp_offset_text value=' + 
						time_offset.toString() + ' /> Hours to change timestamp</p>\n' + 
					'<p><label for="id_showdate">Show Date:</label><input type=checkbox id=pimp_showdate_checkbox';
	if( show_date )
	{
		content_html += ' checked';
	}
	content_html += ' /> Uncheck to see time since last share</p>\n' + 
					'<p><label for="id_showtotals">Show Totals:</label><input type=checkbox id=pimp_showtotals_checkbox';
	if( show_totals )
	{
		content_html += ' checked';
	}
	content_html += ' /> Insert totals at the bottom of each column</p>\n' + 
					'<p><label for="id_showxstats">Extra Stats:</label><input type=checkbox id=pimp_showxstats_checkbox';
	if( show_xstats )
	{
		content_html += ' checked';
	}
	content_html += ' /> Add extra performance info to the stats page</p>\n' + 
					'<p><label for="id_showxhist">Extra History:</label><input type=checkbox id=pimp_showxhist_checkbox';
	if( show_xhist )
	{
		content_html += ' checked';
	}
	content_html += ' /> Show 60 rows history on the stats page</p>\n' + 
					'<a href=javascript:// onclick=\'window.open("http://client4.addonchat.com/chat.php?fs&id=518279", "Complain about long blocks", "location=1,status=1,scrollbars=1,width=600,height=480");\'>Open DaCoinMinster\'s Chatroom</a>\n';
	if(unhide_comments)
	{
		content_html = content_html.replace(/<!--/g,'');
		content_html = content_html.replace(/-->/g,'');
	}

	if(time_offset == null ) time_offset = 0;
	var temp_html = content_html;
	content_html = '';
	var tr_loc = temp_html.indexOf('<tr>');
	var td_loc = temp_html.indexOf('<td>');
	var end_td_loc;
	var td_count = 0;
	var num_tds = 0;
	var td_total = new Array();
	for( td_count = 0; td_count < 30; td_count++ )
		td_total[td_count] = 1-1;
	var thisdate = null;
	while(td_loc > -1)
	{
		if(tr_loc > -1 && tr_loc < td_loc)
			td_count = 0;
		td_loc += 4;
		content_html += temp_html.substring(0,td_loc);
		temp_html = temp_html.substring(td_loc);
		end_td_loc = temp_html.indexOf('</td>');
		if( temp_html.substring(4,5) + temp_html.substring(7,8) + temp_html.substring(10,11) + 
						temp_html.substring(13,14) + temp_html.substring(16,17) == '-- ::' )
		{
			thisdate = new Date(temp_html.substring(0,4), temp_html.substring(5,7)-1, temp_html.substring(8,10), 
									temp_html.substring(11,13), temp_html.substring(14,16), temp_html.substring(17,19), 0);
			temp_html = temp_html.substring(19);
			thisdate.setTime(thisdate.getTime() + (time_offset*60*60*1000));
			if(show_date)
			{
				temp_html = thisdate.getFullYear() + '-' + add_padding(thisdate.getMonth()+1,2) + '-' + 
								add_padding(thisdate.getDate(),2) + '&nbsp;' + add_padding(thisdate.getHours(),2) + ':' + 
								add_padding(thisdate.getMinutes(),2) + ':' + add_padding(thisdate.getSeconds(),2) + temp_html;
			}
			else
			{
				var right_now = new Date();
				var ms_ago = right_now.getTime() - thisdate.getTime();
				var temp_string = '';
				if(Math.abs(ms_ago) < 60*1000)
					temp_string = '<b><font color=green>' + (ms_ago / 1000).toFixed(0) + '&nbsp;s</font></b>';
				else if(Math.abs(ms_ago) < 60*60*1000)
					temp_string = '<b><font color=black>' + (ms_ago / 60 / 1000).toFixed(0) + '&nbsp;m</font></b>';
				else if(Math.abs(ms_ago) < 24*60*60*1000)
					temp_string = '<b><font color=orange>' + (ms_ago / 60 / 60 / 1000).toFixed(1) + '&nbsp;h</font></b>';
				else
					temp_string = '<b><font color=red>' + (ms_ago / 24 / 60 / 60 / 1000).toFixed(1) + '&nbsp;d</font></b>';
				temp_html = temp_string + temp_html;
			}
		}
		else if(end_td_loc > -1)
		{
			var td_contents = temp_html.substring(0,end_td_loc);
			if( (td_contents - 0) == td_contents && td_contents.length > 0 )
			{
				//if( td_count == 3) alert(td_count + ',' + td_contents + ',' + td_total[td_count]);
				td_total[td_count] += parseFloat(td_contents);
			}
		}
		td_count++;
		if(td_count > num_tds)
			num_tds = td_count;
		tr_loc = temp_html.indexOf('<tr>');
		td_loc = temp_html.indexOf('<td>');
	}

	// Insert totals row
	if(show_totals)
	{
		var end_table_loc = temp_html.indexOf('</tbody>');
		content_html += temp_html.substring(0,end_table_loc);
		temp_html = temp_html.substring(end_table_loc);
		content_html += '<tr><td align=right><b>Totals:</b></td>';
		for (td_count = 1; td_count < num_tds; td_count++)
		{
			if( td_total[td_count] != 0 )
				content_html += '<td>' + td_total[td_count].toFixed(0) + '</td>';
			else
				content_html += '<td></td>';
		}
		content_html += '</tr>';
	}

	// Add anything else
	content_html += temp_html;

	// Add donation addresses
	content_html += '<hr>Please consider donating to:<br>';
	content_html += '<table><tr><td align=right>dacoinminster at:</td><td>19hMEAaRMbEhfSkeU4GT8mgSuyR4t4M6TH</td></tr>';
	content_html += '<tr><td align=right>slush at:</td><td>1FNTpsLm8Mitdd99YC1tHSyN2dVMdQiWYo</td></tr></table>';

	document.getElementById('content').innerHTML = content_html;
	document.getElementById('pimp_unhide_checkbox').addEventListener('change',unhide_change,true);
	document.getElementById('pimp_offset_text').addEventListener('keyup',offset_change,true);
	document.getElementById('pimp_showdate_checkbox').addEventListener('change',showdate_change,true);
	document.getElementById('pimp_showtotals_checkbox').addEventListener('change',showtotals_change,true);
	document.getElementById('pimp_showxstats_checkbox').addEventListener('change',showxstats_change,true);
	document.getElementById('pimp_showxhist_checkbox').addEventListener('change',showxhist_change,true);

	update_timer();
}
else if (this_url.indexOf('/stats/') > -1 && this_url.indexOf('/stats/graphs/') == -1)
{
	content_html = document.getElementById('content').innerHTML;
	if( time_offset < 0 )
		content_html = content_html.replace(/UTC/g,'UTC' + time_offset.toString());
	else
		content_html = content_html.replace(/UTC/g,'UTC+' + time_offset.toString());
	document.getElementById('content').innerHTML = content_html;

	
	content_html = document.getElementById('block-history').innerHTML;
	var temp_html = content_html;
	content_html = '';
	var end_tr_loc;
	if( show_xstats )
	{
		end_tr_loc = temp_html.indexOf('</tr>');
		content_html += temp_html.substring(0,end_tr_loc);
		temp_html = temp_html.substring(end_tr_loc);
		content_html += '<th>Cluster GHash/S</th><th>Your MHash/S</th>';
	}

	var tr_loc = temp_html.indexOf('<tr>');
	var td_loc = temp_html.indexOf('<td>');
	var end_td_loc;
	var td_count = 0;
	var tr_count = 0;
	var num_tds = 0;
	var td_total = new Array();
	var duration = -1;
	var shares = -1;
	var reward = -1;
	var block_num = -1;
	var start_block_num = -1;
	var duration_col = -1;
	for( td_count = 0; td_count < 30; td_count++ )
		td_total[td_count] = 1-1;
	var thisdate = null;
	while(td_loc > -1)
	{
		if(tr_loc > -1 && tr_loc < td_loc)
		{
			duration = -1;
			shares = -1;
			reward = -1;
			td_count = 0;
			tr_count++;
		}
		td_loc += 4;
		content_html += temp_html.substring(0,td_loc);
		temp_html = temp_html.substring(td_loc);
		end_td_loc = temp_html.indexOf('</td>');
		if( temp_html.substring(4,5) + temp_html.substring(7,8) + temp_html.substring(10,11) + 
						temp_html.substring(13,14) + temp_html.substring(16,17) == '-- ::' )
		{
			thisdate = new Date(temp_html.substring(0,4), temp_html.substring(5,7)-1, temp_html.substring(8,10), 
									temp_html.substring(11,13), temp_html.substring(14,16), temp_html.substring(17,19), 0);
			temp_html = temp_html.substring(19);
			thisdate.setTime(thisdate.getTime() + (time_offset*60*60*1000));
			temp_html = thisdate.getFullYear() + '-' + add_padding(thisdate.getMonth()+1,2) + '-' + 
								add_padding(thisdate.getDate(),2) + '&nbsp;' + add_padding(thisdate.getHours(),2) + ':' + 
								add_padding(thisdate.getMinutes(),2) + ':' + add_padding(thisdate.getSeconds(),2) + temp_html;
		}
		else if(end_td_loc > -1)
		{
			var td_contents = temp_html.substring(0,end_td_loc);
			if(  temp_html.substring(1,2) + temp_html.substring(4,5) == '::' )
			{
				duration = parseFloat(temp_html.substring(0,1))*60*60 + parseFloat(temp_html.substring(2,4))*60 + 
								parseFloat(temp_html.substring(5,7));
				td_total[td_count] += duration;
				duration_col = td_count;
			}
			else if( (td_contents - 0) == td_contents && td_contents.length > 0 )
			{
				if( duration > -1 )
				{
					if( shares == -1 )
						shares = parseFloat(td_contents);
					else if( reward == -1 )
					{
						reward = parseFloat(td_contents);
						if( show_xstats )
						{
							end_tr_loc = temp_html.indexOf('</tr>');
							var ghash = (shares/duration)*4.412;
							var mhash = 1000 * ghash * reward / 50;
							var new_cells = '<td>' + ghash.toFixed(2) + '</td>' + 
											'<td>' + mhash.toFixed(2) + '</td>';
							temp_html = temp_html.substring(0,end_tr_loc) + new_cells + temp_html.substring(end_tr_loc);
						}
					}
				}
				//if( td_count == 3) alert(td_count + ',' + td_contents + ',' + td_total[td_count]);
				td_total[td_count] += parseFloat(td_contents);
			}
			else
			{
				var conf_loc = td_contents.indexOf('confirmations left');
				if (conf_loc > -1)
					temp_html = temp_html.substring(0, conf_loc - 1) + '&nbsp;' + temp_html.substring(conf_loc + 14);
				else
				{
					var link_loc = td_contents.indexOf('">');
					var end_link_loc = td_contents.indexOf("</a>");
					if( link_loc > -1 && end_link_loc > -1 )
					{
						if ( start_block_num == -1 )
							start_block_num = parseFloat(td_contents.substring(link_loc+2,end_link_loc));
						block_num = parseFloat(td_contents.substring(link_loc+2,end_link_loc));
					}
				}
			}
		}
		td_count++;
		if(td_count > num_tds)
			num_tds = td_count;
		tr_loc = temp_html.indexOf('<tr>');
		td_loc = temp_html.indexOf('<td>');
	}

	// Insert totals row
	if(show_totals)
	{
		var end_table_loc = temp_html.indexOf('</tbody>');
		content_html += temp_html.substring(0,end_table_loc);
		temp_html = temp_html.substring(end_table_loc);
		content_html += '<tr><td align=right colspan=2><b>Totals:</b></td>';
		for (td_count = 2; td_count < num_tds; td_count++)
		{
			if( td_total[td_count] != 0 )
			{
				if(td_count == 4)
					content_html += '<td>' + td_total[td_count].toFixed(8) + '</td>';
				else if(td_count == duration_col)
				{
					duration = td_total[td_count];
					var seconds = duration%60;
					var minutes = ((duration - seconds) / 60)%60;
					var hours = (duration - minutes*60 - seconds)/60/60;
					content_html += '<td>' + hours + ':' + add_padding(minutes,2) + ':' + add_padding(seconds,2) + '</td>';
				}
				else
					content_html += '<td>' + td_total[td_count].toFixed(0) + '</td>';
			}
			else
				content_html += '<td></td>';
		}
		content_html += '</tr>';
		content_html += '<tr><td align=right colspan=2><b>Averages:</b></td>';
		for (td_count = 2; td_count < num_tds; td_count++)
		{
			if( td_total[td_count] != 0 )
			{
				if(td_count == 4)
					content_html += '<td>' + (td_total[td_count]/tr_count).toFixed(8) + '</td>';
				else if(td_count == duration_col)
				{
					duration = (td_total[td_count]/tr_count).toFixed(0);
					var seconds = duration%60;
					var minutes = ((duration - seconds) / 60)%60;
					var hours = (duration - minutes*60 - seconds)/60/60;
					content_html += '<td>' + hours + ':' + add_padding(minutes,2) + ':' + add_padding(seconds,2) + '</td>';
				}
				else
					content_html += '<td>' + (td_total[td_count]/tr_count).toFixed(0) + '</td>';
			}
			else
				content_html += '<td></td>';
		}
		content_html += '</tr>';
	}

	// Add anything else
	content_html += temp_html;

	document.getElementById('block-history').innerHTML = content_html;

	var block_history_rows = tr_count;
	var avg_cluster_perf = td_total[7]/tr_count;
	
	content_html = document.getElementById('operational-stats').innerHTML;var temp_html = content_html;
	content_html = '';
	tr_loc = temp_html.indexOf('<tr>');
	td_loc = temp_html.indexOf('<td>');
	end_td_loc;
	td_count = 0;
	tr_count = 0;
	num_tds = 0;
	td_total = new Array();
	for( td_count = 0; td_count < 30; td_count++ )
		td_total[td_count] = 1-1;
	thisdate = null;
	while(td_loc > -1)
	{
		if(tr_loc > -1 && tr_loc < td_loc)
		{
			td_count = 0;
			tr_count++;
		}
		td_loc += 4;
		content_html += temp_html.substring(0,td_loc);
		temp_html = temp_html.substring(td_loc);
		end_td_loc = temp_html.indexOf('</td>');
		if( temp_html.substring(4,5) + temp_html.substring(7,8) + temp_html.substring(10,11) + 
						temp_html.substring(13,14) + temp_html.substring(16,17) == '-- ::' )
		{
			thisdate = new Date(temp_html.substring(0,4), temp_html.substring(5,7)-1, temp_html.substring(8,10), 
									temp_html.substring(11,13), temp_html.substring(14,16), temp_html.substring(17,19), 0);
			temp_html = temp_html.substring(19);
			thisdate.setTime(thisdate.getTime() + (time_offset*60*60*1000));
			temp_html = thisdate.getFullYear() + '-' + add_padding(thisdate.getMonth()+1,2) + '-' + 
								add_padding(thisdate.getDate(),2) + '&nbsp;' + add_padding(thisdate.getHours(),2) + ':' + 
								add_padding(thisdate.getMinutes(),2) + ':' + add_padding(thisdate.getSeconds(),2) + temp_html;
		}
		td_count++;
		if(td_count > num_tds)
			num_tds = td_count;
		tr_loc = temp_html.indexOf('<tr>');
		td_loc = temp_html.indexOf('<td>');
	}

	// Insert network performance
	if( show_xstats )
	{
		var end_table_loc = temp_html.indexOf('</tbody>');
		content_html += temp_html.substring(0,end_table_loc);
		temp_html = temp_html.substring(end_table_loc);
		var network_perf = avg_cluster_perf*((start_block_num - block_num)/block_history_rows);
		content_html += '<tr><td><strong>Avg. cluster performance:</strong></td><td> ' + avg_cluster_perf.toFixed(3) + ' Ghash/s</td></tr>' + 
						'<tr><td><strong>Avg. network performance:</strong></td><td> ' + network_perf.toFixed(3) + ' Ghash/s</td></tr>';
	}

	// Add anything else
	content_html += temp_html;
	document.getElementById('operational-stats').innerHTML = content_html;
}