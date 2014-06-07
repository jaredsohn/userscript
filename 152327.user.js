// ==UserScript==
// @name           iCheckBTN
// @description    An iCheckMovies (and iCheckPopcorn) clone for BTN. Display checks for all the episodes, seasons, and series you've seen on BTN. Get Awards. Rate Series.
// @version        0.1
//
// @include        *://broadcasthe.net/user.php*
// @include        *://broadcasthe.net/torrents.php*
// @require        http://cdn.broadcasthe.net/functions/jquery.js
// ==/UserScript==

// Changelog
//
// Version 0.1 - Initial release
// End Changelog
//window.localStorage.clear();

var url_parts = document.URL.split('broadcasthe.net/');
var base_url = url_parts[0] + 'broadcasthe.net/';
var page_url = url_parts[1];

// Array of arrays: [[series_id, series_name, series_rating, finished, [[season_number, season_rating, finished, [[episode_number, episode_rating, finished]]]]]]

var ratings_array = JSON.parse(window.localStorage.getItem('ratings_array'));
if(!ratings_array) ratings_array = [];
var page_type = null;
if(page_url.match(/user.php\?id=/))
{
	userid = window.localStorage.getItem('userid');
	if(!userid) userid = get_userid();
	userid_RegExp = new RegExp('id=' + userid);
	if(page_url.match(userid_RegExp))
	{
		page_type = 'profile';
		add_styles();
		add_iCheckBTN_to_profile();
	}
}
else if(page_url.match(/torrents.php/))
{
	if(page_url.match(/id=/))
	{
		page_type = 'torrent';
		add_styles();
		torrent_checkmarks();
	}
	else
	{
		page_type = 'browse';
		add_styles();
		browse_checkmarks();
	}
}

function torrent_checkmarks()
{
	title_container = document.getElementsByTagName('h2')[0];
	series_id = +title_container.getElementsByTagName('a')[0].href.split('id=')[1];
	if(!ratings_array[0]) series_id_index = -1;
	else series_id_index = find_series_id(series_id, ratings_array);
	series_name = title_container.getElementsByTagName('img')[0].getAttribute('alt');
	torrent_episode = false;
	checked = false;
	title_string = title_container.innerHTML.split('<br>')[1].split(' [')[0];
	if(title_string.match(/Season/))
	{
		if(!title_string.match(/Season [0-9]+/)) return;
		torrent_season = +(title_string.split('Season ')[1]);
		if(!ratings_array[0]) torrent_season_index = -1;
		else torrent_season_index = find_torrent_season(series_id_index, torrent_season, ratings_array);

		if(series_id_index >= 0 && torrent_season_index >= 0)
		{
			if(ratings_array[series_id_index][4][torrent_season_index][2] == 'true') checked = true;
		}
	}
	else
	{
		if(title_string.match(/S[0-9]+E[0-9]+/))
		{
			temp = title_string.split('S')[1].split('E');
			torrent_season = +temp[0];
			if(!ratings_array[0]) torrent_season_index = -1;
			else torrent_season_index = find_torrent_season(series_id_index, torrent_season, ratings_array);
			torrent_episode = +temp[1];
			if(!ratings_array[0]) torrent_episode_index = -1;
			else torrent_episode_index = find_torrent_episode(series_id_index, torrent_season_index, torrent_episode, ratings_array);

			if(series_id_index >= 0 && torrent_season_index >= 0 && torrent_episode_index >= 0)
			{
				if(ratings_array[series_id_index][4][torrent_season_index][3][torrent_episode_index][2] == 'true') checked = true;
			}
		}
		else return;

	}
	add_checkbox(checked, series_id, series_name, torrent_season, 'after', document.getElementById('content').getElementsByTagName('a')[5], torrent_episode);
}

function insertAfter(insert_element, position_element)
{
	if(position_element.nextSibling) position_element.parentNode.insertBefore(insert_element, position_element.nextSibling);
	else position_element.parentNode.appendChild(insert_element);
}

function browse_checkmarks()
{
	torrent_table = document.getElementById('torrent_table');
	torrents = torrent_table.getElementsByTagName('tr');
	for(x=1; x<torrents.length; x++)
	{
		torrent_details = torrents[x].getElementsByTagName('td')[2];
		torrent_as = torrent_details.getElementsByTagName('a');
		if(torrent_as.length < 4) continue;
		series_id = torrent_as[2].href.split('id=')[1];
		if(!ratings_array[0]) series_id_index = -1;
		else series_id_index = find_series_id(series_id, ratings_array);
		torrent_id = torrent_as[3].href.split('id=')[1];
		series_name = torrent_as[2].innerHTML;
		torrent_imgs = torrents[x].getElementsByTagName('img');
		checked = false;
		torrent_episode = false;
		torrent_season = false;
		if(torrent_imgs[0].alt.match(/Season/))
		{
			// + converts to an int
			if(!torrent_as[3].innerHTML.match(/Season [0-9]+/)) continue;
			torrent_season = +(torrent_as[3].innerHTML.split('Season ')[1]);
			if(!ratings_array[0]) torrent_season_index = -1;
			else torrent_season_index = find_torrent_season(series_id_index, torrent_season, ratings_array);

			if(series_id_index >= 0 && torrent_season_index >= 0)
			{
				if(ratings_array[series_id_index][4][torrent_season_index][2] == 'true') checked = true;
			}
		}
		else
		{
			if(torrent_as[3].innerHTML.match(/S[0-9]+E[0-9]+/))
			{
				season_episode_string = torrent_as[3].innerHTML.match(/S[0-9]+E[0-9]+/)[0];
				temp = season_episode_string.split('S')[1].split('E');
				torrent_season = +temp[0];
				if(!ratings_array[0]) torrent_season_index = -1;
				else torrent_season_index = find_torrent_season(series_id_index, torrent_season, ratings_array);
				torrent_episode = +temp[1];
				if(!ratings_array[0]) torrent_episode_index = -1;
				else torrent_episode_index = find_torrent_episode(series_id_index, torrent_season_index, torrent_episode, ratings_array);

				if(series_id_index >= 0 && torrent_season_index >= 0 && torrent_episode_index >= 0)
				{
					if(ratings_array[series_id_index][4][torrent_season_index][3][torrent_episode_index][2] == 'true') checked = true;
				}
			}
			else continue;

		}
		add_checkbox(checked, series_id, series_name, torrent_season, 'before', torrent_as[0], torrent_episode);
	}
}

function add_checkbox(checked, series_id, series_name, torrent_season, insert_pos, pos_element, torrent_episode)
{
	checkbox = document.createElement('div');
	if(checked)
	{
		theclass = 'icheckbtn_checked '+series_id;
		if(torrent_season) theclass += '-'+torrent_season;
		if(torrent_episode) theclass += '-'+torrent_episode;
		checkbox.setAttribute('class', theclass);
		checkbox.setAttribute('checked', true);
	}
	else
	{
		theclass = 'icheckbtn_unchecked '+series_id;
		if(torrent_season) theclass += '-'+torrent_season;
		if(torrent_episode) theclass += '-'+torrent_episode;
		checkbox.setAttribute('class', theclass);
		checkbox.setAttribute('checked', false);
	}
	checkbox.setAttribute('series_id', series_id);
	checkbox.setAttribute('series_name', series_name);
	if(torrent_season) checkbox.setAttribute('torrent_season', torrent_season);
	if(torrent_episode) checkbox.setAttribute('torrent_episode', torrent_episode);

	checkbox.addEventListener('click', toggle_checkbox, false);

	if(insert_pos == 'before')
	{
		pos_element.parentNode.insertBefore(checkbox, pos_element);
	}
	else if(insert_pos == 'after')
	{
		insertAfter(checkbox, pos_element);
	}
	else if(insert_pos == 'into')
	{
		pos_element.appendChild(checkbox);
	}
}

function find_series_id(series_id, ratings_array)
{
	for(y=0; y<ratings_array.length; y++)
	{
		if(ratings_array[y][0] == series_id) return y;
	}
	return -1;
}

function find_torrent_season(series_id_index, torrent_season, ratings_array)
{
	if(series_id_index < 0) return -1;
	for(y=0; y<ratings_array[series_id_index][4].length; y++)
	{
		if(ratings_array[series_id_index][4][y][0] == torrent_season) return y;
	}
	return -1;
}

function find_torrent_episode(series_id_index, torrent_season_index, torrent_episode, ratings_array)
{
	if(series_id_index < 0 || torrent_season_index < 0) return -1;
	for(y=0; y<ratings_array[series_id_index][4][torrent_season_index][3].length; y++)
	{
		if(ratings_array[series_id_index][4][torrent_season_index][3][y][0] == torrent_episode) return y;
	}
	return -1;
}

function toggle_checkbox()
{
	if(this.getAttribute('checked')=='true')
	{
		theclass = ''+this.getAttribute('series_id');
		if(this.getAttribute('torrent_season')) theclass += '-'+this.getAttribute('torrent_season');
		if(this.getAttribute('torrent_episode')) theclass += '-'+this.getAttribute('torrent_episode');
		$('.'+theclass).attr('checked', 'false');
		$('.'+theclass).attr('class', 'icheckbtn_unchecked '+theclass);
		series_id_index = find_series_id(this.getAttribute('series_id'), ratings_array);
		if(this.getAttribute('torrent_season'))
		{
			torrent_season_index = find_torrent_season(series_id_index, this.getAttribute('torrent_season'), ratings_array);
			if(this.getAttribute('torrent_episode'))
			{
				torrent_episode_index = find_torrent_episode(series_id_index, torrent_season_index, this.getAttribute('torrent_episode'), ratings_array);
				ratings_array[series_id_index][4][torrent_season_index][3][torrent_episode_index][2] = '';
				window.localStorage.setItem('ratings_array', JSON.stringify(ratings_array));
			}
			else
			{
				ratings_array[series_id_index][4][torrent_season_index][2] = '';
				window.localStorage.setItem('ratings_array', JSON.stringify(ratings_array));
			}
		}
		else
		{
			ratings_array[series_id_index][3] = '';
			window.localStorage.setItem('ratings_array', JSON.stringify(ratings_array));
			
		}
	}
	else
	{
		theclass = ''+this.getAttribute('series_id');
		if(this.getAttribute('torrent_season')) theclass += '-'+this.getAttribute('torrent_season');
		if(this.getAttribute('torrent_episode')) theclass += '-'+this.getAttribute('torrent_episode');
		$('.'+theclass).attr('checked', 'true');
		$('.'+theclass).attr('class', 'icheckbtn_checked '+theclass);
		series_id_index = find_series_id(this.getAttribute('series_id'), ratings_array);
		if(this.getAttribute('torrent_season'))
		{
			torrent_season_index = find_torrent_season(series_id_index, this.getAttribute('torrent_season'), ratings_array);
			if(series_id_index < 0)
			{
				temp_array = [this.getAttribute('series_id'), this.getAttribute('series_name'), '', '', [[this.getAttribute('torrent_season'), '', '',[]]]];
				if(this.getAttribute('torrent_episode'))
				{
					temp_array[4][0][3].push([this.getAttribute('torrent_episode'), '', 'true']);
				}
				else
				{
					temp_array[4][0][2] = 'true';
				}
				ratings_array.push(temp_array);
				window.localStorage.setItem('ratings_array', JSON.stringify(ratings_array));
			}
			else if(torrent_season_index < 0)
			{
				if(!this.getAttribute('torrent_episode'))
				{
					temp_array = [this.getAttribute('torrent_season'), '', 'true'];
				}
				else
				{
					temp_array = [this.getAttribute('torrent_season'), '', '', [[this.getAttribute('torrent_episode'), '', 'true']]];
				}
				ratings_array[series_id_index][4].push(temp_array);
				window.localStorage.setItem('ratings_array', JSON.stringify(ratings_array));
			}
			else
			{
				if(!this.getAttribute('torrent_episode'))
				{
					ratings_array[series_id_index][4][torrent_season_index][2] = 'true';
				}
				else
				{
					torrent_episode_index = find_torrent_episode(series_id_index, torrent_season_index, this.getAttribute('torrent_episode'), ratings_array);
					if(torrent_episode_index >= 0) ratings_array[series_id_index][4][torrent_season_index][3][torrent_episode_index][2] = 'true';
					else
					{
						temp_array = [this.getAttribute('torrent_episode'), '', 'true'];
						ratings_array[series_id_index][4][torrent_season_index][3].push(temp_array);
					}
				}
				window.localStorage.setItem('ratings_array', JSON.stringify(ratings_array));
			}
		}
		else
		{
			if(series_id_index < 0)
			{
				temp_array = [this.getAttribute('series_id'), this.getAttribute('series_name'), '', 'true', [[[]]]];
				ratings_array.push(temp_array);
			}
			else
			{
				ratings_array[series_id_index][3] = 'true';
			}
		}
	}
}

function add_iCheckBTN_to_profile()
{
	profile_container = document.getElementById('slider');
	scroll_container = profile_container.getElementsByTagName('div')[2];
	navigation_list = profile_container.getElementsByTagName('ul')[0];
	
	new_nav_list_item = document.createElement('li');
	new_nav_list_item.setAttribute('class', 'head colhead');
	new_nav_link = document.createElement('a');
	new_nav_link.setAttribute('class', '');
	new_nav_link.href = '#section6';
	new_nav_link.innerHTML = 'iCheckBTN';
	new_nav_list_item.appendChild(new_nav_link);
	navigation_list.appendChild(new_nav_list_item);

	profile_sections_container = document.getElementById('section1').parentNode;
	section6 = document.createElement('div');
	section6.setAttribute('class', 'panel');
	section6.id = 'section6';
	section6.setAttribute('style', 'float: left; position: relative;');

	iCheckBTN_box = document.createElement('div');
	iCheckBTN_box.setAttribute('class', 'box icheckbtn');
	section6.appendChild(iCheckBTN_box);

	iCheckBTN_menu = document.createElement('ul');
	iCheckBTN_menu.setAttribute('style', 'margin-bottom: 5px; list-style: none; text-align: center;');
	iCheckBTN_box.appendChild(iCheckBTN_menu);

	iCheckBTN_menu_ratings = document.createElement('li');
	iCheckBTN_menu_ratings.setAttribute('class', 'head colhead');
	iCheckBTN_menu_ratings.setAttribute('style', 'display: inline; margin-right: 10px;');
	iCheckBTN_menu.appendChild(iCheckBTN_menu_ratings);

	iCheckBTN_menu_ratings_a = document.createElement('a');
	iCheckBTN_menu_ratings_a.href = 'javascript:void(0)';
	iCheckBTN_menu_ratings_a.setAttribute('style', 'padding: 5px; text-decoration: none;');
	iCheckBTN_menu_ratings_a.setAttribute('section', 'ratings');
	iCheckBTN_menu_ratings_a.addEventListener('click', toggle_section, false);
	iCheckBTN_menu_ratings_a.innerHTML = 'Ratings';
	iCheckBTN_menu_ratings.appendChild(iCheckBTN_menu_ratings_a);

	iCheckBTN_menu_awards = document.createElement('li');
	iCheckBTN_menu_awards.setAttribute('class', 'head colhead');
	iCheckBTN_menu_awards.setAttribute('style', 'display: inline; margin-right: 10px;');
	iCheckBTN_menu.appendChild(iCheckBTN_menu_awards);

	iCheckBTN_menu_awards_a = document.createElement('a');
	iCheckBTN_menu_awards_a.href = 'javascript:void(0)';
	iCheckBTN_menu_awards_a.setAttribute('style', 'padding: 5px; text-decoration: none;');
	iCheckBTN_menu_awards_a.setAttribute('section', 'awards');
	iCheckBTN_menu_awards_a.addEventListener('click', toggle_section, false);
	iCheckBTN_menu_awards_a.innerHTML = 'Awards';
	iCheckBTN_menu_awards.appendChild(iCheckBTN_menu_awards_a);

	iCheckBTN_menu_settings = document.createElement('li');
	iCheckBTN_menu_settings.setAttribute('class', 'head colhead');
	iCheckBTN_menu_settings.setAttribute('style', 'display: inline; margin-right: 10px;');
	iCheckBTN_menu.appendChild(iCheckBTN_menu_settings);

	iCheckBTN_menu_settings_a = document.createElement('a');
	iCheckBTN_menu_settings_a.href = 'javascript:void(0)';
	iCheckBTN_menu_settings_a.setAttribute('style', 'padding: 5px; text-decoration: none;');
	iCheckBTN_menu_settings_a.setAttribute('section', 'settings');
	iCheckBTN_menu_settings_a.addEventListener('click', toggle_section, false);
	iCheckBTN_menu_settings_a.innerHTML = 'Settings';
	iCheckBTN_menu_settings.appendChild(iCheckBTN_menu_settings_a);

	iCheckBTN_menu_trakt = document.createElement('li');
	iCheckBTN_menu_trakt.setAttribute('class', 'head colhead');
	iCheckBTN_menu_trakt.setAttribute('style', 'display: inline; margin-right: 10px;');
	iCheckBTN_menu.appendChild(iCheckBTN_menu_trakt);

	iCheckBTN_menu_trakt_a = document.createElement('a');
	iCheckBTN_menu_trakt_a.href = 'javascript:void(0)';
	iCheckBTN_menu_trakt_a.setAttribute('style', 'padding: 5px; text-decoration: none;');
	iCheckBTN_menu_trakt_a.setAttribute('section', 'trakt');
	iCheckBTN_menu_trakt_a.addEventListener('click', toggle_section, false);
	iCheckBTN_menu_trakt_a.innerHTML = 'Trakt.tv';
	iCheckBTN_menu_trakt.appendChild(iCheckBTN_menu_trakt_a);

	iCheckBTN_settings_box = document.createElement('div');
	iCheckBTN_settings_box.setAttribute('id', 'icheckbtn_settings');
	iCheckBTN_settings_box.setAttribute('style', 'display: none;');
	iCheckBTN_box.appendChild(iCheckBTN_settings_box);

	iCheckBTN_settings_head = document.createElement('div');
	iCheckBTN_settings_head.setAttribute('class', 'head colhead');
	iCheckBTN_settings_head.setAttribute('style', 'text-align: center;');
	iCheckBTN_settings_head_bold = document.createElement('b');
	iCheckBTN_settings_head_bold.innerHTML = 'Settings';
	iCheckBTN_settings_head.appendChild(iCheckBTN_settings_head_bold);
	iCheckBTN_settings_box.appendChild(iCheckBTN_settings_head);

	iCheckBTN_trakt_box = document.createElement('div');
	iCheckBTN_trakt_box.setAttribute('id', 'icheckbtn_trakt');
	iCheckBTN_trakt_box.setAttribute('style', 'display: none;');
	iCheckBTN_box.appendChild(iCheckBTN_trakt_box);

	iCheckBTN_trakt_head = document.createElement('div');
	iCheckBTN_trakt_head.setAttribute('class', 'head colhead');
	iCheckBTN_trakt_head.setAttribute('style', 'text-align: center;');
	iCheckBTN_trakt_head_bold = document.createElement('b');
	iCheckBTN_trakt_head_bold.innerHTML = 'Trakt.tv';
	iCheckBTN_trakt_head.appendChild(iCheckBTN_trakt_head_bold);
	iCheckBTN_trakt_box.appendChild(iCheckBTN_trakt_head);

	iCheckBTN_trakt = document.createElement('div');
	iCheckBTN_import_div = document.createElement('div');
	iCheckBTN_import_div.setAttribute('class', 'trakt');
	iCheckBTN_import_link = document.createElement('a');
	iCheckBTN_import_link.href = 'javascript:void(0);';
	iCheckBTN_import_link.innerHTML = 'Import from Trakt.tv';
	iCheckBTN_import_link.addEventListener('click', trakt_import, false);
	iCheckBTN_trakt.appendChild(iCheckBTN_import_div);
	iCheckBTN_import_div.appendChild(iCheckBTN_import_link);
	iCheckBTN_trakt_status = document.createElement('div');
	iCheckBTN_trakt_status.setAttribute('id', 'trakt_status');
	iCheckBTN_trakt_status.setAttribute('class', 'trakt_divs');
	iCheckBTN_trakt_results = document.createElement('div');
	iCheckBTN_trakt_results.setAttribute('id', 'trakt_results');
	iCheckBTN_trakt_results.setAttribute('class', 'trakt_divs');
	iCheckBTN_trakt_box.appendChild(iCheckBTN_trakt);
	iCheckBTN_trakt.appendChild(iCheckBTN_trakt_status);
	iCheckBTN_trakt.appendChild(iCheckBTN_trakt_results);

	iCheckBTN_award_box = document.createElement('div');
	iCheckBTN_award_box.setAttribute('id', 'icheckbtn_awards');
	iCheckBTN_award_box.setAttribute('style', 'display: none;');
	iCheckBTN_box.appendChild(iCheckBTN_award_box);

	iCheckBTN_award_head = document.createElement('div');
	iCheckBTN_award_head.setAttribute('class', 'head colhead');
	iCheckBTN_award_head.setAttribute('style', 'text-align: center;');
	iCheckBTN_award_head_bold = document.createElement('b');
	iCheckBTN_award_head_bold.innerHTML = 'Awards';
	iCheckBTN_award_head.appendChild(iCheckBTN_award_head_bold);
	iCheckBTN_award_box.appendChild(iCheckBTN_award_head);

	iCheckBTN_awards = document.createElement('div');
	iCheckBTN_awards.setAttribute('class', 'icheckbtn');
	iCheckBTN_awards.innerHTML = 'Awards go here';
	iCheckBTN_award_box.appendChild(iCheckBTN_awards);

	iCheckBTN_rating_box = document.createElement('div');
	iCheckBTN_rating_box.setAttribute('id', 'icheckbtn_ratings');
	iCheckBTN_rating_box.setAttribute('style', 'display: block;');
	iCheckBTN_box.appendChild(iCheckBTN_rating_box);

	insertAfter(section6, document.getElementById('section5'));
	add_ratings_to_profile();
}

function add_ratings_to_profile()
{
	iCheckBTN_rating_box = document.getElementById('icheckbtn_ratings');
	iCheckBTN_rating_box.innerHTML = '';

	iCheckBTN_rating_head = document.createElement('div');
	iCheckBTN_rating_head.setAttribute('class', 'head colhead');
	iCheckBTN_rating_head.setAttribute('style', 'text-align: center;');
	iCheckBTN_rating_head_bold = document.createElement('b');
	iCheckBTN_rating_head_bold.innerHTML = 'Ratings';
	iCheckBTN_rating_head.appendChild(iCheckBTN_rating_head_bold);
	iCheckBTN_rating_box.appendChild(iCheckBTN_rating_head);

	iCheckBTN_ratings = document.createElement('div');
	iCheckBTN_rating_box.appendChild(iCheckBTN_ratings);
	iCheckBTN_ratings.setAttribute('class', 'icheckbtn');
	iCheckBTN_ratings_table = document.createElement('table');
	iCheckBTN_rating_box.appendChild(iCheckBTN_ratings_table);
	theader = document.createElement('tr');
	iCheckBTN_ratings_table.appendChild(theader);
	tcolumn_1_header = document.createElement('th');
	tcolumn_1_header.innerHTML =  'Series/Season/Episode';
	theader.appendChild(tcolumn_1_header);
	tcolumn_2_header = document.createElement('th');
	tcolumn_2_header.innerHTML = 'Rating';
	theader.appendChild(tcolumn_2_header);
	tcolumn_3_header = document.createElement('th');
	tcolumn_3_header.innerHTML = 'Checked';
	tcolumn_3_header.setAttribute('style', 'width: 8em;');
	theader.appendChild(tcolumn_3_header);

	for(x=0; x<ratings_array.length; x++)
	{
		display = false;
		break_out = false;
		if(ratings_array[x][3] == 'true') display = true;
		for(y=0; y<ratings_array[x][4].length; y++)
		{
			if(ratings_array[x][4][y][2] == 'true')
			{
				display = true;
				break;
			}
			for(z=0; z<ratings_array[x][4][y][3].length; z++)
			{
				if(ratings_array[x][4][y][3][z][2] == 'true')
				{
					display = true;
					break_out = true;
					break;
				}
			}
			if(break_out) break;
		}
		if(display)
		{
			series_tr = document.createElement('tr');
			iCheckBTN_ratings_table.appendChild(series_tr);
			series_name_td = document.createElement('td');
			series_tr.appendChild(series_name_td);

			series_name_a = document.createElement('a');
			series_name_a.innerHTML = ratings_array[x][1];
			series_name_a.href = base_url + 'series.php?id=' + ratings_array[x][0];
			series_name_td.appendChild(series_name_a);

			series_name_td.appendChild(document.createTextNode(' '));

			season_toggle_display = document.createElement('a');
			season_toggle_display.innerHTML = '[+]';
			season_toggle_display.setAttribute('class', 'toggler');
			season_toggle_display.href = 'javascript:void(0)';
			season_toggle_display.setAttribute('toggle_on', '.ser'+ratings_array[x][0]);
			season_toggle_display.addEventListener('click', toggle_display, false);
			series_name_td.appendChild(season_toggle_display);

			series_rating_td = document.createElement('td');
			series_rating_td.setAttribute('style', 'text-align: center;');
			if(!ratings_array[x][2] && ratings_array[x][3] == 'true')
			{
				textbox = document.createElement('input');
				textbox.setAttribute('type', 'text');
				textbox.setAttribute('style', 'width: 2em;');
				textbox.setAttribute('series_id', ratings_array[x][0]);
				textbox.setAttribute('torrent_season', ratings_array[x][4][y][0]);
				
				series_rating_td.appendChild(textbox);
				textbox.addEventListener('blur', do_rating, false);
			
			}
			else
			{
				series_rating_span = document.createElement('span');
				series_rating_td.appendChild(series_rating_span);
				series_rating_span.setAttribute('checked', ratings_array[x][3]);
				series_rating_span.setAttribute('series_id', ratings_array[x][0]);
				series_rating_span.setAttribute('rating', ratings_array[x][2]);
				series_rating_span.innerHTML = (ratings_array[x][2]) ? ratings_array[x][2] : '--';
				series_rating_span.addEventListener('click', click_rating, false);
			}
			series_tr.appendChild(series_rating_td);

			series_checked_td = document.createElement('td');
			pos_element = document.createElement('div');
			pos_element.setAttribute('style', 'margin-left: auto; margin-right: auto; width: 17px; height: 19px;');
			series_checked_td.appendChild(pos_element);
			series_tr.appendChild(series_checked_td);
			add_checkbox(ratings_array[x][3], ratings_array[x][0], ratings_array[x][1], '', 'into', pos_element, '');

			for(y=0; y<ratings_array[x][4].length; y++)
			{
				season_tr = document.createElement('tr');
				season_tr.setAttribute('style', 'display: none;');
				season_tr.setAttribute('class', 'serall ser'+ratings_array[x][0]);
				iCheckBTN_ratings_table.appendChild(season_tr);
				season_name_td = document.createElement('td');
				season_tr.appendChild(season_name_td);
				season_name_span = document.createElement('span');
				season_name_span.innerHTML = 'Season ' + ratings_array[x][4][y][0];
				season_name_span.setAttribute('style', 'position: relative; left: 50px;');
				season_name_td.appendChild(season_name_span);
				season_rating_td = document.createElement('td');
				season_rating_td.setAttribute('style', 'text-align: center;');
				season_tr.appendChild(season_rating_td);
				if(!ratings_array[x][4][y][1] && ratings_array[x][4][y][2] == 'true')
				{
					textbox = document.createElement('input');
					textbox.setAttribute('type', 'text');
					textbox.setAttribute('style', 'width: 2em;');
					textbox.setAttribute('series_id', ratings_array[x][0]);
					textbox.setAttribute('torrent_season', ratings_array[x][4][y][0]);
					
					season_rating_td.appendChild(textbox);
					textbox.addEventListener('blur', do_rating, false);
				
				}
				else
				{
					season_rating_span = document.createElement('span');
					season_rating_td.appendChild(season_rating_span);
					season_rating_td.setAttribute('style', 'text-align: center;');
					season_rating_span.setAttribute('checked', ratings_array[x][4][y][2]);
					season_rating_span.setAttribute('series_id', ratings_array[x][0]);
					season_rating_span.setAttribute('torrent_season', ratings_array[x][4][y][0]);
					season_rating_span.setAttribute('rating', ratings_array[x][4][y][1]);
					season_rating_span.innerHTML = (ratings_array[x][4][y][1]) ? ratings_array[x][4][y][1] : '--';
					season_rating_span.addEventListener('click', click_rating, false);
				}
				
				season_checked_td = document.createElement('td');
				pos_element = document.createElement('div');
				pos_element.setAttribute('style', 'margin-left: auto; margin-right: auto; width: 17px; height: 19px;');
				season_checked_td.appendChild(pos_element);
				season_tr.appendChild(season_checked_td);
				add_checkbox(ratings_array[x][4][y][2], ratings_array[x][0], ratings_array[x][1], ratings_array[x][4][y][0], 'into', pos_element, '');

				for(z=0; z<ratings_array[x][4][y][3].length; z++)
				{
					episode_tr = document.createElement('tr');
					episode_tr.setAttribute('style', 'display: none;');
					episode_tr.setAttribute('class', 'serall ser'+ratings_array[x][0]);
					iCheckBTN_ratings_table.appendChild(episode_tr);
					episode_name_td = document.createElement('td');
					episode_tr.appendChild(episode_name_td);
					episode_name_span = document.createElement('span');
					episode_name_span.innerHTML = 'Episode ' + ratings_array[x][4][y][3][z][0];
					episode_name_span.setAttribute('style', 'position: relative; left: 100px;');
					episode_name_td.appendChild(episode_name_span);
					episode_rating_td = document.createElement('td');
					episode_rating_td.setAttribute('style', 'text-align: center;');
					episode_tr.appendChild(episode_rating_td);
					if(!ratings_array[x][4][y][3][z][1] && ratings_array[x][4][y][3][z][2] == 'true')
					{
						textbox = document.createElement('input');
						textbox.setAttribute('type', 'text');
						textbox.setAttribute('style', 'width: 2em;');
						textbox.setAttribute('series_id', ratings_array[x][0]);
						textbox.setAttribute('torrent_season', ratings_array[x][4][y][0]);
						textbox.setAttribute('torrent_episode', ratings_array[x][4][y][3][z][0]);
						
						episode_rating_td.appendChild(textbox);
						textbox.addEventListener('blur', do_rating, false);
					
					}
					else
					{
						episode_rating_span = document.createElement('span');
						episode_rating_td.appendChild(episode_rating_span);
						episode_rating_span.setAttribute('checked', ratings_array[x][4][y][3][z][2]);
						episode_rating_span.setAttribute('series_id', ratings_array[x][0]);
						episode_rating_span.setAttribute('torrent_season', ratings_array[x][4][y][0]);
						episode_rating_span.setAttribute('torrent_episode', ratings_array[x][4][y][3][z][0]);
						episode_rating_span.setAttribute('rating', ratings_array[x][4][y][3][z][1]);
						episode_rating_span.innerHTML = (ratings_array[x][4][y][3][z][1]) ? ratings_array[x][4][y][3][z][1] : '--';
						episode_rating_span.addEventListener('click', click_rating, false);
					}

					episode_checked_td = document.createElement('td');
					pos_element = document.createElement('div');
					pos_element.setAttribute('style', 'margin-left: auto; margin-right: auto; width: 17px; height: 19px;');
					episode_checked_td.appendChild(pos_element);
					episode_tr.appendChild(episode_checked_td);
					add_checkbox(ratings_array[x][4][y][3][z][2], ratings_array[x][0], ratings_array[x][1], ratings_array[x][4][y][0], 'into', pos_element, ratings_array[x][4][y][3][z][0]);

				}
			}
		}
// add_checkbox(checked, series_id, series_name, torrent_season, insert_pos, pos_element, torrent_episode)
	}
}

function toggle_section()
{
	sections = ['ratings', 'awards', 'settings', 'trakt'];
	for(section in sections)
	{
		if(sections[section] == this.getAttribute('section')) continue;

		document.getElementById('icheckbtn_'+sections[section]).setAttribute('style', 'display: none;');
	}
	document.getElementById('icheckbtn_'+this.getAttribute('section')).setAttribute('style', 'display: block;');
}

Function.prototype.bind = function( thisObject ) {
  var method = this;
  var oldargs = [].slice.call( arguments, 1 );
  return function () {
    var newargs = [].slice.call( arguments );
    return method.apply( thisObject, oldargs.concat( newargs ));
  };
}

var page_load_count = 0;

function trakt_import()
{
	page_load_count = 0;
	trakt_status_box = document.getElementById('trakt_status');
	trakt_results_box = document.getElementById('trakt_results');
	// May as well get the user's api key while checking if they're logged in
	trakt_status_box.innerHTML = 'Checking if you\'re logged into Trakt.tv';
	trakt_status_box.setAttribute('style', 'color: white;');
	API_url = 'http://trakt.tv/settings/api';
	page_load_count++;
	GM_xmlhttpRequest({
		method: "GET",
		url: API_url,
		onload: api_xmlhttprequest_callback.bind( {}, trakt_status_box, trakt_results_box, API_url)
	});
		
}

function api_xmlhttprequest_callback(trakt_status_box, trakt_results_box, API_url, response)
{
	if(response.finalUrl != API_url)
	{
		trakt_status_box.innerHTML = 'Not logged in to Trakt.tv, cannot import.';
		trakt_status_box.setAttribute('style', 'color: red;');
	}
	else
	{
		trakt_status_box.innerHTML = 'You are logged in to Trakt.tv, continuing to parse BTN autocomplete list of series.';
		trakt_status_box.setAttribute('style', 'color: green;');
		newdoc = document.createElement('div');
		newdoc.innerHTML = response.responseText;
		user_api_key = newdoc.getElementsByTagName('input')[2].value;
		window.localStorage.setItem('user_api_key', user_api_key);
		trakt_username = false;
		newdoc_as = newdoc.getElementsByTagName('a');
		for(i=0; i < newdoc_as.length; i++)
		{
			if(~newdoc_as[i].href.indexOf('/user/'))
			{
				trakt_username = newdoc_as[i].href.split('/user/')[1];
				break;
			}
		}
		if(!trakt_username)
		{
			trakt_status_box.innerHTML = 'Can\'t find Trakt username, this shouldn\'t happen.';
			trakt_status_box.setAttribute('style', 'color: red;');
			return;
		}
		page_load_count++;
		GM_xmlhttpRequest({
			method: "GET",
			url: 'https://broadcasthe.net/series_autocomplete.php',
			onload: btn_parse_autocomplete_xmlhttprequest_callback.bind( {}, trakt_status_box, trakt_results_box)
		});
	}

}

function btn_parse_autocomplete_xmlhttprequest_callback(trakt_status_box, trakt_results_box, response)
{
		trakt_status_box.innerHTML = 'Parsing BTN autocomplete list of series.';
		series_list = [[],[]];
		temp_array = response.responseText.split('[value] => ');
		for(i=1; i<temp_array.length; i++)
		{
			value = temp_array[i].split('\n')[0];
			label = temp_array[i].split('[label] => ')[1].split('\n')[0]
			series_list[0].push(value);
			series_list[1].push(label);
		}
		btn_seriesids_array = JSON.parse(window.localStorage.getItem('btn_seriesids'));
		if(btn_seriesids_array)
		{
			btn_seriesnames_array = JSON.parse(window.localStorage.getItem('btn_seriesnames'));
			series_list[0] = series_list[0].concat(btn_seriesids_array);
			series_list[1] = series_list[1].concat(btn_seriesnames_array);
		}
		

		trakt_status_box.innerHTML = 'Parsed list of series, continuing to loading Library page.';

		page_load_count++;
		GM_xmlhttpRequest({
			method: "GET",
			url: 'http://trakt.tv/user/'+trakt_username+'/library',
			onload: trakt_library_xmlhttprequest_callback.bind( {}, trakt_status_box, trakt_results_box, series_list)
		});
}

var finished_all_counter = 0;
var series_count = 0;

function trakt_library_xmlhttprequest_callback(trakt_status_box, trakt_results_box, series_list, response)
{
	trakt_status_box.innerHTML = 'Library page loaded, continuing to parsing series.';
	trakt_doc = document.createElement('div');
	trakt_doc.innerHTML = response.responseText;

	trakt_num = trakt_doc.getElementsByTagName('strong')[0].innerHTML;
	series_count = trakt_num;
	trakt_results_box.innerHTML = 'Trakt.tv is showing '+trakt_num+' TV series.<br>';
	trakt_library_wrapper = trakt_doc.getElementsByClassName('library-wrapper')[0];
	trakt_shows = trakt_library_wrapper.getElementsByClassName('title');
	for(i=0; i < trakt_shows.length; i++)
	{
		trakt_status_box.innerHTML = 'Loading series '+i+'.';
		trakt_show = trakt_shows[i].href.split('/show/')[1];
		page_load_count++;
		GM_xmlhttpRequest({
			method: "GET",
			url: 'http://trakt.tv/show/'+trakt_show,
			onload: trakt_show_xmlhttprequest_callback.bind( {}, trakt_status_box, trakt_results_box, series_list)
		});
	}
}

function trakt_show_xmlhttprequest_callback(trakt_status_box, trakt_results_box, series_list, response)
{
	trakt_show_div = document.createElement('div');
	trakt_results_box.appendChild(trakt_show_div);
	trakt_doc = document.createElement('div');
	trakt_doc.innerHTML = response.responseText;

	trakt_inputs = trakt_doc.getElementsByTagName('input');
	trakt_title = trakt_inputs[4].value;
	trakt_tvdbid = trakt_inputs[3].value;

	seriesid_index = series_list[1].indexOf(trakt_title);
	if(seriesid_index == -1)
	{
		trakt_show_div.innerHTML = '<br>'+trakt_title + ' - Could not find show in BTN autocomplete, trying more intensive methods.';
		trakt_show_div.setAttribute('style', 'color: orange;');
		sanitised_title = encodeURIComponent(trakt_title);
		
		btn_search_series(trakt_status_box, trakt_show_div, trakt_doc, trakt_title, trakt_tvdbid, sanitised_title, 0);
	}
	else
	{
		series_id = series_list[0][seriesid_index];
		trakt_btn_search_split(series_id, trakt_status_box, trakt_show_div, trakt_tvdbid, trakt_doc, trakt_title);
	}
}

function btn_search_series(trakt_status_box, trakt_show_div, trakt_doc, trakt_title, trakt_tvdbid, sanitised_title, set)
{
	trakt_status_box.innerHTML = 'Intensive method: Searching BTN for '+trakt_title+' with string '+ sanitised_title;
	search_url = base_url + '/torrents.php?searchstr=' + sanitised_title;
	page_load_count++;
	GM_xmlhttpRequest({
		method: "GET",
		url: search_url,
		onload: btn_search_series_xmlhttprequest_callback.bind( {}, trakt_status_box, trakt_show_div, trakt_tvdbid, trakt_doc, trakt_title, set)
	});
}

function btn_search_series_xmlhttprequest_callback(trakt_status_box, trakt_show_div, trakt_tvdbid, trakt_doc, trakt_title, set, response)
{
	btn_search_doc = document.createElement('div');
	btn_search_doc.innerHTML = response.responseText;
	series_id_array = [];
	btn_search_finish_count = 0;

	btn_search_table = btn_search_doc.getElementsByClassName('torrent_table');
	if(btn_search_table.length == 0)
	{
		btn_search_failed(trakt_status_box, trakt_show_div, trakt_doc, trakt_title, trakt_tvdbid, set);
		return;
	}
	else
	{
		btn_search_table = btn_search_table[0];
	}
	btn_search_trs = btn_search_table.getElementsByClassName('torrent');
	for(i=0; i<btn_search_trs.length; i++)
	{
		series_id = btn_search_trs[i].innerHTML.split('series.php?id=')[1].split('"')[0];
		if(series_id_array.indexOf(series_id) == -1) series_id_array.push(series_id);
	}
	for(i=0; i<series_id_array.length; i++)
	{
		page_load_count++;
		GM_xmlhttpRequest({
			method: "GET",
			url: base_url + '/series.php?id=' + series_id_array[i],
			onload: check_tvdbid_xmlhttprequest_callback.bind( {}, trakt_status_box, trakt_show_div, trakt_tvdbid, trakt_doc, trakt_title, series_id_array[i], btn_search_finish_count++, series_id_array.length, set)
		});
	}
}

function check_tvdbid_xmlhttprequest_callback(trakt_status_box, trakt_show_div, trakt_tvdbid, trakt_doc, trakt_title, series_id, btn_search_finish_count, series_id_array_length, set, response)
{
	if(trakt_show_div.getAttribute('found') == 'true') return;

	series_page = document.createElement('div');
	series_page.innerHTML = response.responseText;
	sidebar = series_page.getElementsByClassName('sidebar')[0];
	tvdb_id = sidebar.innerHTML.split('thetvdb.com/?tab=series&amp;id=')
	if(tvdb_id.length > 1) tvdb_id = tvdb_id[1].split('">')[0];
	else return;

	if(tvdb_id == trakt_tvdbid)
	{
		btn_seriesids_array = JSON.parse(window.localStorage.getItem('btn_seriesids'));
		if(!btn_seriesids_array) btn_seriesids_array = [];
		btn_seriesnames_array = JSON.parse(window.localStorage.getItem('btn_seriesnames'));
		if(!btn_seriesnames_array) btn_seriesnames_array = [];
		btn_seriesids_array.push(series_id)
		btn_seriesnames_array.push(trakt_title);
		window.localStorage.setItem('btn_seriesids', JSON.stringify(btn_seriesids_array));
		window.localStorage.setItem('btn_seriesnames', JSON.stringify(btn_seriesnames_array));

		trakt_show_div.setAttribute('found', 'true');
		trakt_status_box.innerHTML = 'Intensive method: Searching BTN for '+trakt_title+', found series!';
		trakt_show_div.innerHTML = '';
		trakt_show_div.setAttribute('style', '');
		trakt_btn_search_split(series_id, trakt_status_box, trakt_show_div, trakt_tvdbid, trakt_doc, trakt_title);
		return;
	}

	if(btn_search_finish_count == series_id_array_length-1)
	{
		btn_search_failed(trakt_status_box, trakt_show_div, trakt_doc, trakt_title, trakt_tvdbid, set);
	}
}

function btn_search_failed(trakt_status_box, trakt_show_div, trakt_doc, trakt_title, trakt_tvdbid, set)
{
	if(set == 0)
	{
		trakt_show_div.innerHTML += '<br>'+trakt_title + ' - More intensive methods: attempt one failed, trying once more.';
		title_biggest_word = get_biggest_word(trakt_title);
		sanitised_title = encodeURIComponent(title_biggest_word);
		btn_search_series(trakt_status_box, trakt_show_div, trakt_doc, trakt_title, trakt_tvdbid, sanitised_title, 1);
	}
	else
	{
		trakt_show_div.innerHTML += '<br>'+trakt_title + ' - More intensive methods: attempt two failed, manual entry:<br>Paste the btn series id (the xx in \'broadcasthe.net/series.php?id=xx\') into the box and press \'Go\'.';
		manual_entry_div = document.createElement('div');
		trakt_show_div.appendChild(manual_entry_div);

		manual_entry_input = document.createElement('input')
		manual_entry_input.setAttribute('type', 'text');
		manual_entry_input.setAttribute('style', 'margin-right: 5px;');
		manual_entry_div.appendChild(manual_entry_input);

		manual_entry_go = document.createElement('span');
		manual_entry_go.innerHTML = 'Go';
		manual_entry_go.setAttribute('style', 'cursor: pointer;');
		manual_entry_div.appendChild(manual_entry_go);
		manual_entry_go.addEventListener('click', manual_entry_going.bind( {}, trakt_status_box, trakt_show_div, trakt_tvdbid, trakt_doc, trakt_title, manual_entry_input), false);
	}
}

function manual_entry_going(trakt_status_box, trakt_show_div, trakt_tvdbid, trakt_doc, trakt_title, manual_entry_input)
{
	series_id = manual_entry_input.value;

	btn_seriesids_array = JSON.parse(window.localStorage.getItem('btn_seriesids'));
	if(!btn_seriesids_array) btn_seriesids_array = [];
	btn_seriesnames_array = JSON.parse(window.localStorage.getItem('btn_seriesnames'));
	if(!btn_seriesnames_array) btn_seriesnames_array = [];
	btn_seriesids_array.push(series_id)
	btn_seriesnames_array.push(trakt_title);
	window.localStorage.setItem('btn_seriesids', JSON.stringify(btn_seriesids_array));
	window.localStorage.setItem('btn_seriesnames', JSON.stringify(btn_seriesnames_array));

	
	trakt_status_box.innerHTML = 'Intensive method: Manually entered id for '+trakt_title;
	trakt_show_div.innerHTML = '';
	trakt_show_div.setAttribute('style', '');
	trakt_btn_search_split(series_id, trakt_status_box, trakt_show_div, trakt_tvdbid, trakt_doc, trakt_title);
}

function get_biggest_word(title)
{
	temp_title = title.replace(/([0-9]+)/g,'');
	temp_title = encodeURIComponent(temp_title);
	temp_title = temp_title.replace(/\%../g,' ');
	temp_array = temp_title.split(' ');
	temp_array.sort(string_size_sortfunction);
	return temp_array[0];
}

function string_size_sortfunction(a, b)
{
	if(a.length > b.length) return -1;
	if(a.length < b.length) return 1;
	return 0;
}


function trakt_btn_search_split(series_id, trakt_status_box, trakt_show_div, trakt_tvdbid, trakt_doc, trakt_title)
{
	series_array = [];
	backup_array = [];
	finished_counter = 0;
	series_index = find_series_id(series_id, ratings_array);
	if(series_index >= 0)
	{
		trakt_status_box.innerHTML = 'Parsing '+trakt_title+'. Found existing record, updating.';
		backup_array = ratings_array[series_index];
	}
	else
	{
		trakt_status_box.innerHTML = 'Parsing '+trakt_title+'.';
	}

	series_array = [series_id, trakt_title, , , []];
	
	trakt_library_wrapper = trakt_doc.getElementsByClassName('library-wrapper')[0];
	trakt_seasons = trakt_library_wrapper.getElementsByClassName('title');
	special_check = trakt_seasons[trakt_seasons.length-1].href.split('/');
	season_offset = 1;
	if(special_check[special_check.length-1] == 'specials') season_offset = 0;
	
	for(i=0; i<trakt_seasons.length; i++)
	{
		series_array[4].push([i+season_offset, , , []]);
	}
	for(i=0; i < trakt_seasons.length; i++)
	{
		trakt_season = trakt_seasons[i].href.split('/show/')[1];
		season_number_sent = (trakt_seasons.length-(i+1))+season_offset;
		trakt_status_box.innerHTML = 'Loading '+series_array[1]+', Season '+season_number_sent+'.';
		page_load_count++;
		GM_xmlhttpRequest({
			method: "GET",
			url: 'http://trakt.tv/show/'+trakt_season,
			onload: trakt_season_xmlhttprequest_callback.bind( {}, trakt_status_box, trakt_show_div, trakt_tvdbid, finished_counter++, trakt_seasons.length, season_number_sent, series_array, season_offset, series_index, backup_array)
		});
	}
	
}

// Array of arrays: [[series_id, series_name, series_rating, finished, [[season_number, season_rating, finished, [[episode_number, episode_rating, finished]]]]]]
function trakt_season_xmlhttprequest_callback(trakt_status_box, trakt_show_div, trakt_tvdbid, finished_counter, trakt_seasons_length, season, series_array, season_offset, series_index, backup_array, response)
{
	array_location = season-season_offset;
	trakt_status_box.innerHTML = 'Parsing '+series_array[1]+', Season '+season+'.';
	trakt_doc = document.createElement('div');
	trakt_doc.innerHTML = response.responseText;
	trakt_episodes_wrapper = trakt_doc.getElementsByClassName('episodes-wrapper')[0];
	trakt_episodes = trakt_episodes_wrapper.getElementsByClassName('episode-row');
	seen_all = true;
	for(i=0; i<trakt_episodes.length; i++)
	{
		episode_link = trakt_episodes[i].getElementsByClassName('episode-link')[0].href.split('/');
		episode_num = episode_link[episode_link.length-1];
		if(trakt_episodes[i].getElementsByClassName('episode-overlay-seen').length > 0)
		{
			episode_seen = 'true';
		}
		else
		{
			episode_seen = '';
			seen_all = false;
		}
		// Maybe add here an option to have loved episodes added with a set rating, and to settings
		temp_array = [episode_num, , episode_seen];
		series_array[4][array_location][3].push(temp_array);
		
	}
	if(seen_all)
	{
		series_array[4][array_location][2] = 'true';
	}
	finished = false;
	for(i=0; i<series_array[4].length; i++)
	{
		if(series_array[4][i][3].length > 0)
		{
			finished = true;
		}
		else
		{
			finished = false;
			break;
		}
	}
	if(finished)
	{
		if(series_index >= 0)
		{
			series_array[2] = backup_array[2];
			if(backup_array[3] == 'true')
			{
				series_array[3] = 'true';
			}
			for(i=0; i<backup_array[4].length; i++)
			{
				season_array_location = backup_array[4][i][0]-season_offset;
				series_array[4][season_array_location][1] = backup_array[4][i][1];
				if(backup_array[4][i][2] == 'true')
				{
					series_array[4][season_array_location][2] = 'true';
				}
				for(j=0; j<backup_array[4][i][3].length; j++)
				{
					for(k=0; k<series_array[4][season_array_location][3].length; k++)
					{
						if(backup_array[4][i][3][j][0] == series_array[4][season_array_location][3][k][0])
						{
							series_array[4][season_array_location][3][k][1] = backup_array[4][i][3][j][1];
							if(backup_array[4][i][3][j][2] == 'true')
							{
								series_array[4][season_array_location][3][k][2] = 'true';
							}
						}
					}
				}
			}
			trakt_status_box.innerHTML = 'Updated '+series_array[1]+'.';
			ratings_array[series_index] = series_array;
		}
		else
		{
			ratings_array.push(series_array);
		}
		window.localStorage.setItem('ratings_array', JSON.stringify(ratings_array));
		seasons_checked = 0;
		episodes_checked = 0;
		episodes_total = 0;
		for(i=0; i<series_array[4].length; i++)
		{
			if(series_array[4][i][2] == 'true') seasons_checked++;
			for(j=0; j<series_array[4][i][3].length; j++)
			{
				if(series_array[4][i][3][j][2] == 'true') episodes_checked++;
				episodes_total++;
			}
		}
		trakt_show_div.innerHTML += '<br>'+series_array[1]+': '+series_array[4].length+' Seasons, '+seasons_checked+' marked as seen.<br>'+series_array[1]+': '+episodes_total+' Episodes, '+episodes_checked+' marked as seen.';
		trakt_status_box.innerHTML = 'Series '+series_array[1]+' imported.';
		finished_all_counter++;
		if(finished_all_counter >= series_count)
		{
			sort_ratings_array();
			trakt_status_box.innerHTML = 'All '+series_count+' series imported to iCheckBTN. Import complete. '+page_load_count+' pages loaded.';
			trakt_status_box.setAttribute('style', 'color: #306EFF;');
		}
	}
}

function sort_ratings_array()
{
	ratings_array.sort(ratings_array_sortfunction);
	window.localStorage.setItem('ratings_array', JSON.stringify(ratings_array));
	add_ratings_to_profile();
}

function ratings_array_sortfunction(a, b)
{
	if(a[1] < b[1]) return -1;
	if(a[1] > b[1]) return 1;
	return 0;
}

function click_rating()
{
	series_id = this.getAttribute('series_id');
	torrent_season = this.getAttribute('torrent_season');
	torrent_episode = this.getAttribute('torrent_episode');
	checked = false;
	series_id_index = find_series_id(series_id, ratings_array);
	if(torrent_season) torrent_season_index = find_torrent_season(series_id_index, torrent_season, ratings_array);
	if(torrent_episode) torrent_episode_index = find_torrent_episode(series_id_index, torrent_season_index, torrent_episode, ratings_array);

	if(torrent_episode) checked = ratings_array[series_id_index][4][torrent_season_index][3][torrent_episode_index][2];
	else if(torrent_season) checked = ratings_array[series_id_index][4][torrent_season_index][2];
	else checked = ratings_array[series_id_index][3];

	if(checked == 'true')
	{
		rating = this.getAttribute('rating');
		this.style.display = 'none';

		textbox = document.createElement('input');
		textbox.setAttribute('type', 'text');
		textbox.setAttribute('style', 'width: 2em;');
		textbox.value = rating;
		textbox.setAttribute('series_id', series_id);
		textbox.setAttribute('torrent_season', torrent_season);
		textbox.setAttribute('torrent_episode', torrent_episode);
		
		this.parentNode.appendChild(textbox);
		textbox.focus();
		textbox.addEventListener('blur', do_rating, false);
	}
}

function do_rating()
{
	series_id = this.getAttribute('series_id');
	torrent_season = this.getAttribute('torrent_season');
	torrent_episode = this.getAttribute('torrent_episode');
	rating = parseInt(this.value, 10);
	if(!(rating >= 0)) return;

	series_id_index = find_series_id(series_id, ratings_array);
	if(torrent_season) torrent_season_index = find_torrent_season(series_id_index, torrent_season, ratings_array);
	if(torrent_episode) torrent_episode_index = find_torrent_episode(series_id_index, torrent_season_index, torrent_episode, ratings_array);

	if(torrent_episode) ratings_array[series_id_index][4][torrent_season_index][3][torrent_episode_index][1] = rating;
	else if(torrent_season) ratings_array[series_id_index][4][torrent_season_index][1] = rating;
	else ratings_array[series_id_index][2] = rating;

	parentn = this.parentNode;
	parentn.innerHTML = '';
	rating_span = document.createElement('span');
	parentn.appendChild(rating_span);
	rating_span.setAttribute('checked', 'true');
	rating_span.setAttribute('series_id', series_id);
	rating_span.setAttribute('torrent_season', torrent_season);
	rating_span.setAttribute('torrent_episode', torrent_episode);
	rating_span.setAttribute('rating', rating);
	rating_span.innerHTML = rating;
	rating_span.addEventListener('click', click_rating, false);

	window.localStorage.setItem('ratings_array', JSON.stringify(ratings_array));
}

// Array of arrays: [[series_id, series_name, series_rating, finished, [[season_number, season_rating, finished, [[episode_number, episode_rating, finished]]]], filled_in]]
function toggle_display()
{
	if(this.innerHTML == '[+]')
	{
		this.innerHTML = '[-]';
		$(this.getAttribute('toggle_on')).show();
	}
	else
	{
		this.innerHTML = '[+]';
		$(this.getAttribute('toggle_on')).hide();
	}
}

function get_userid()
{
	userid = document.getElementById('userinfo_username').getElementsByTagName('a')[0].href.split('user.php?id=')[1];
	window.localStorage.setItem('userid', userid);
	return userid;
}

function add_styles()
{
	styleElement = document.createElement('style');
	styleElement.type = 'text/css';
	styleElement.appendChild(document.createTextNode(".trakt { text-align: center; }"));
	styleElement.appendChild(document.createTextNode(".trakt_divs { margin: 10px; }"));
	styleElement.appendChild(document.createTextNode(".icheckbtn_unchecked, .icheckbtn_checked { width: 19px; height: 17px; cursor: pointer; float: left;}"));
	styleElement.appendChild(document.createTextNode(".icheckbtn_checked { background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAARCAYAAAA/mJfHAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAA+tJREFUOMtd0s9rXFUYxvHvOffcO3cmyRhiZ6ZJxmmTNEyHEGuKCZJWq0Gx/qB0rbVC6arrLvwP1G4LLrISoRAXhZAWsUisEE2hoQZqAmmbFEsmHc0kk1gTZs7cc+5xYRrEZ/ny8Fm8PIL/xTknent726Mo6ldKeW1tbbvNZtPb3t5utdYubmxs1P7b/wge9EHrCuyI58d8Pl/yfb/k+74H5IBjUsp0EAR1a22jXq8LY8wDY8wvvu+vvbO5acTOzs/noM8HMw0bCuDy5cv+5OTkx4lEIkgkEp4Qos8Yc0ophed5kXOuHgSB01qf0Vp/Zq2df3l3941h8DvA1cGbgQ3hnBMjIyOvaK3Ph2HYIoQYiKJoSCmV2MMQQhDHMcYY12g03NsLC+4DY/w8UAFuwupZGFKzs7OeMeZEEAQHnXMnnXOd3d3dXjabJZPJ0NHRgVKKcrnM/Pw8nue5Yhy79j3oLmxcgcIVQJRKpaFEInEJGEulUr3FYpFcLkc6nSaTyZDL5VBKYa1le3ubtYsXGdUagEnP2/2uv39oaWnpEYACXhNCHLXWdhYKBfr7+ykUChw5coTOzk5SqRTNZpP19XXuXbjAmNa0Abc9z80cP/6t32jkgH+xMAwDoFgsFpPFmzcZnZhgKp/nw4UFWlpakFISxzFfDw8zVq1yEPgDmAsCEYZhazqd9p8vQlprXwJcMpnkrZ0dXgDOlst8NTCAlBIpJZ7n0dFo0LYH3c5mqZ44ESulVCaT2Z+XdM4dlFLqnp4efmpv52+gEzi5tsaXhQLOOT4vFDhWq1GTkl8zGS4tLuJ5Hkop0draGu1jUsoN55xMp9P0Xb3Kj5kMlT3wzbU1vjlwgANa4wvBn6kUnz58iDEG5xzW2lBrXd/Hoij6PY7jNq01Silen5hg6tAhKkAGeLdWY6xape4clZYWGo0Gq6urxHHM7u5ud6VSsfuYMWZbSvl0ZWWFzc1NarUa52/c4IdCgcrejyrATFcX5+7fJ4oi5ubmMMY4Y0y0tbWV3cfiOK4LIRbn5+fdrVu32Nraolwuc+b6dWazWf4Cbnd1ce7OHZ49e8bjx4+ZmppyWmsnpbzb3t6+9BxT1tplY8xvvu+f0lq/uLy8LIQQGGMYmZggCEPeU4r19XWq1SrXrl1z9XrdOeceSSnvnj59ujI9PQ2AGBgYaA2CYDgMw/fjOP5ECJE5fPiwKJVKIp/Pk0wmaTab7smTJ8zMzDitdVNr/TSdTn/R09NzY3x8fF0IEQMI55wYHR1tU0r1hWE4aK19VQjR32w2j0opk1JKL45j31obCyGWnXOzxph7g4OD34+Pj9eAWAjhAP4B6KjTy/EaHVYAAAAASUVORK5CYII=); }"));
	styleElement.appendChild(document.createTextNode(".icheckbtn_unchecked { background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAARCAYAAAA/mJfHAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAA6BJREFUOMt1kk9rW1cQxc/ce997V/+eapsnx5GKLMeqK7siDmm9iAOhu1AwpB+g3yL7bPsZtCx4kV1wNwXjlakDCUHQNtA0NtSN/4AsFDfGPN337r3TRWPRtHRWM4v5cWbOIfyrmJkWFhY+yvO8rZSSlUrlMssyeX5+XnbOvRwOhyP8T9FV02g0OkEQdIIgkABmAdwUQsRhGKbOuXGapmStfWWt/TEIguPxePyOmS8GgwF/AHv48GHw5MmTR1EUhVEUSSK6Ya29p5SClDJn5tRay8aYyBgjnXN959wLZv4uy7JXV0DFzLS2tvZZsVgsaa1LRLSS5/mtKIqi9zAQEbz3iKKIx+Mxe+9rWZbdyrLsp06nc7C9vZ0DgNrb25PW2vUwDK8x811mnqvX67JWqyFJEkxPT0MphaOjI/T7fUgp2TlXkVL+KaXsAtgCkAOAfPr06U0p5Yb3/q7Wurm8vCxarRbm5ubQaDQwPz+PWq2GZrOJTqeDk5MTStM0FEK8c86dj0ajX65MkUmSfB0EwZfe+08WFxeD5eVltNtt3L59G6urq1hYWECSJJBSIo5jLC4uot/vh9baAoDfmPn1YDD4AwCU1joEsLS0tFRot9toNBrodrtoNpsolUoQQsB7j1KphNFohKmpKTx48ACPHz+uCiHKcRwHV24K59zHALhQKKBaraJer2N2dhbFYhFCCAghIKVEsVjE9PQ0qtUq1tfXEQQBlFIqSZJJvBQzXxNCmFarhZmZGWitIaX8Z4gBAFJKhGEIZsb169evXKZyuZxPlAkhhsws4jiGUmqyDABE9GHC38/WWjAznHPaGJNOYHme/+69rxhjoJSCMQZ5nv8HwMyw1mI8HuPNmzfw3uPy8rJ+enrqJmdaa8+11icHBwfxlbrhcIhyuYxCoQAA8N7DGIM0TZHnOZ4/fw5rLVtr87dv39YmMO99SkQv+/3+0mAwoI2NDRwdHcEYg0qlgiiKoJSC9x5ZluH4+BhbW1tsjGEhxLM4jn+dwJxz+9ban4MguGeMmdnf3ycigrUWFxcX0FpDKQUiwtnZGTY3NzlNU2bm10KIZ/fv3z/d2dn5+yUrKyvlMAy/0Fp/5b3/hoiS+fl56nQ61Gg0UCgUkGUZHx4eYnd3l40xmTHmJI7jb1ut1ve9Xm9ARB4AiJnpzp07FaXUDa111zn3ORG1syz7VAhREEJI733gnPNEtM/Me9baF91u94derzcC4ImIAeAvKwDDTTDs7fIAAAAASUVORK5CYII=); }"));
	styleElement.appendChild(document.createTextNode(".icheckbtn_checked:hover, .icheckbtn_unchecked:hover { background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAARCAYAAAA/mJfHAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAA/5JREFUOMtd0s9vVFUcBfBz77vvx/x6HUqm02bGsVNmOp3UKk2QCJqQ6KYhxKUJoBvCyo2BsCisjGVhin9B9yzYEUzQLrqq1oSq00QrNbTEtiPFoe28KQxv7nv33q8LpTGe5cnJZ3UY/hciYiMjI9k4jqtCCCuTyXSjKLKCIEhrrVd3d3f3/7u/AHxxDHA3AMlelcVisW7bdt22bQtAHsBbnHPfcZxQa90Lw5AppX5XSn1v2/afx4NADnQ6n30M5GzALAAvBABcu3bNvnv37kXXdR3XdS3G2DGl1BkhBCzLiokodByHpJQfSimntdaNipRHPuB8Y9CYTgiwReCFICJ28uTJN5LJZMrzvBRjbDyO40nXdd1/MTDGYIyB67rU6/VofGvreMG2JTfmYCeKXtwH9j4HvhJLS0uWUupdx3EGieg9IhoqFArWwMAAcrkc+vv7IYRAs9lEo9GAZVlUEMJNG6O3bbu/rdTqrDHTswBYvV6fdF33UwDvJ5PJkVqthnw+D9/3kcvlkM/nIYSA1hpBEGBlZgaFTicWSgU/av3ng8HBj9bW1h4BgADwDmNsTGs9VCqVUK1WUSqVUKlUMDQ0hGQyiSiK0Gq18NedO5gql7Gxumr/xnnmYbH4s93r5QH8g3me5wCo1Wq1xOjmJt58+hTNSgVj584hlUqBcw5jDJZv3cKkUkj39aE7PIz7W1uu53lp3/ftV4/gWuvXAFAikcAEEY6mUjjV6+G7mzfBOQfnHJZlwTcGfZ6H0HHQqVbxcnSUhBAil8sd3osT0SDnXJbLZWweOQJlWchyjkoQYP76dRARvpmeRikM0RMCT7JZnJ2dhWVZEEKwdDodH2Kc810i4r7vI3/hAtYyGXQA9AEYbbfxw9WrSCsFizEcOA5OzcxAKQUigtbak1KGh1gcx38YYzJSSgghMHLpElayWXQAZACMv3yJsefPERmDtm2j1+the3sbxhh0u93Czs6OPsSUUgHn/MnGxgb29vawv7+P45cv41ffR5sIgTFoG4OH6TRO3LiBOI6xvLwMpRQppeJ2uz1wiBljQsbYaqPRoPn5ebTbbTSbTbx+/jxWiLDb7WLFdTF55QoODg7w+PFj3Lt3j6SUxDl/kM1m115hQmu9rpT6xbbtM1LKo+vr64wxBqUUBi5eROR5GBECrVYLz549w+3btykMQyKiR5zzB1NTUzsLCwsAADY+Pp52HOdtz/POGmM+YYzlhoeHWb1eZ8ViEYlEAlEU0ebmJhYXF0lKGUkpn/i+/2W5XP56bm6uxRgzAMCIiJ0+fTojhDjmed6E1voEY6waRdEY5zzBObeMMbbW2jDG1oloSSn108TExLdzc3P7AAxjjADgbyj76izkzEclAAAAAElFTkSuQmCC); }"));
	document.body.appendChild(styleElement);
}
