// ==UserScript==
// @name        Winter Bash Totals by Polynomial
// @namespace   http://winterba.sh/
// @description Adds a totals bar to StackExchange Winter Bash
// @include     http://winterba.sh/*
// @exclude     http://winterba.sh/faq*
// @exclude     http://winterba.sh/leaderboard*
// @grant       GM_xmlhttpRequest
// @version     1.11
// ==/UserScript==

// Change log:
/*

Version 1.11
 - Update to remove stupid debug testing text from page. Whoops!

Version 1.10
 - Replaced spans with a table.
 - Fixed wrapping issue when a badge was earned on a large numbers of sites.
 - Added a trick with text-indent and padding to keep left align relatively neat.
 - Added mouse-over highlighting to rows.

Version 1.00
 - First version.

*/

var main_section, details_box;
var hat_array = new Array();
var current_index = 0;
var xhr;
var box_contents = '<table>';

document.body.onload = function() {
	main_section = document.body.getElementsByClassName('item-container')[0];
	
	if (main_section == null)
		return;
	
	var anchors = main_section.getElementsByTagName('a');
	for(var i = 0; i < anchors.length; i++)
	{
		var hat_id = anchors[i].id.replace('hat-', '');
		var hat_name_element = anchors[i].getElementsByClassName('hat-name')[0];
		if (hat_name_element != null)
		{
			var hat_name = hat_name_element.innerHTML;
			hat_array.push({id:hat_id,name:hat_name});
		}
	}
	
	details_box = document.createElement('div');
	details_box.innerHTML = '<a href="#" onclick="return false;" style="color:#2262a0;">&#x25BC;&nbsp;detailed list</a>';
	details_box.style.margin = '0 30px 20px 30px';
	details_box.style.padding = '2px';
	details_box.style.border = '2px dotted #00ccff';
	
	details_box.addEventListener('click', show_detailed_list, false);
	
	main_section.insertBefore(details_box, main_section.getElementsByClassName('introText')[0].nextSibling);
}

function get_hat_name(id)
{
	for(var i = 0; i < hat_array.length; i++)
	{
		if(hat_array[i].id == id)
			return hat_array[i].name;
	}
	return 'ERROR';
}

function show_detailed_list(event)
{
	if(current_index == 0)
		load_item(null);
}

function load_item(response)
{	
	details_box.innerHTML = 'loading... ' + Math.round((current_index / hat_array.length) * 100).toString() + '%';
	if(response != null)
	{
		var jsobj = JSON.parse(response.responseText);
		
		var site_regex = /alt="([a-zA-Z\s]+)"/g;
		var url_regex = /href="(http:\/\/[^"]+)"/g;
		
		var site = site_regex.exec(jsobj.html);
		var site_list = new Array();
		while (site != null)
		{
			var site_name = site[1];
			site_list.push(site_name);
			site = site_regex.exec(jsobj.html);
		}
		
		var url = url_regex.exec(jsobj.html);
		var url_list = new Array();
		var url_ctr = 0;
		while (url != null)
		{
			var url_path = url[1];
			if(url_ctr % 2 == 0)
				url_list.push(url_path);
			url_ctr++;
			url = url_regex.exec(jsobj.html);
		}
		
		box_contents += '<tr onMouseOver="this.style.backgroundColor=\'#fff\'" onMouseOut="this.style.backgroundColor=\'transparent\'"><td style="width: 150px">' + get_hat_name(jsobj.hatId) + '</td>';
		box_contents += '<td style="text-indent: -1em; padding-left: 1.15em">';
		if(site_list.length > 0)
		{
			// build link list
			var links = '';
			for(var i = 0; i < site_list.length; i++)
				links += '<a href="' + url_list[i] + '">' + site_list[i] + '</a>, ';
			
			// trim trailing comma
			if(links.length > 0)
				links = links.substr(0, links.length - 2);
			
			box_contents += '&raquo;&nbsp;&nbsp;' + links;
		}
		box_contents += '<span style="font-style: italic; color: #999999">' + (site_list.length > 0 ? '&nbsp;&nbsp;(' + site_list.length.toString() + ')' : 'not yet earned') + '</span></td></tr>';
	}
	current_index++;
	
	if(current_index < hat_array.length)
	{
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://winterba.sh/hat?id=' + hat_array[current_index].id,
			headers: {'Accept': 'application/json'},
			onload: load_item,
			onerror: function(e)
			{
				alert('Error: ' + e.toString());
			}
		});
	}
	else
	{
		box_contents += '</table>';
		details_box.innerHTML = box_contents;
	}
}