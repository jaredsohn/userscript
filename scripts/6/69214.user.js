// ==UserScript==
// @name           IkariamBLAU - Automatic YouTube-Link-Display
// @namespace      http://tonleiter.net/ikariam
// @description    Displays a posted YouTube-link via the YouTube-Videoplayer embedded into the Ikariam instant message field
// @autor          Aldipower / Allianz BLAU
// @version        0.0.1
// @include        http://s*.ikariam.*/index.php*
// ==/UserScript==

/*-------------------------------------------------------------------------------------------------------------
	functions of general use 
-------------------------------------------------------------------------------------------------------------*/

function jd_addEvent(oneEvent, obj, handler) 
{
    if(document.body.addEventListener) obj.addEventListener(oneEvent, handler, false);
    if(document.body.attachEvent) obj.attachEvent("on" + oneEvent, handler);
}

/*-------------------------------------------------------------------------------------------------------------
	functions for YouTube purposes
-------------------------------------------------------------------------------------------------------------*/


function fg_has_youtubeLink(message_row_id)
{
	if(message_row_id == null)
		return false;

	var message_row = document.getElementById(message_row_id);
	
	if(message_row == null)
		return false;
	
	var message = message_row.getElementsByTagName('td')[0].getElementsByTagName('div')[0].innerHTML;
	
	var ids = new Array();
	
	var re = /http:\/\/\w+\.youtube\.\w+\/watch\?v=(\w+)\b.*/g;
	var match;
	
	while(match = re.exec(message))
		ids.push(match[1]);
	
	if(ids.length > 0)
		return ids;
		
	return false;
}

function fg_get_Youtube_embedcode(vidid)
{
	var code = '<object width="560" height="340">' + 
	'<param name="movie" value="http://www.youtube.com/v/' + vidid + '&hl=de_DE&fs=1&"></param>' + 
	'<param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param>' + 
	'<embed src="http://www.youtube.com/v/' + vidid + '&hl=de_DE&fs=1&" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="560" height="340"></embed>' +
	'</object>';
	
	return code;
}

/*-------------------------------------------------------------------------------------------------------------
	Eventhandler
-------------------------------------------------------------------------------------------------------------*/

function fg_topic_row_click(event)
{
	var message_row_id = 'tbl_mail' + event.target.parentNode.id.replace(/message/g,'');
	var youtube_vidids = fg_has_youtubeLink(message_row_id);
	
	if(document.getElementById(message_row_id).style.display == '')
	{
		var message = document.getElementById(message_row_id).getElementsByTagName('td')[0].getElementsByTagName('div')[0];
	
		for(var i = 0; i < youtube_vidids.length; i++)
		{
			if(youtube_vidids[i] && message.getElementsByTagName('div')[i] == null)
				message.innerHTML += '<div name="vid_' + youtube_vidids[i] + '">' + fg_get_Youtube_embedcode(youtube_vidids[i]) + '</div>';
		}
	}
}

function fg_topic_row_mouseover(event)
{
	var message_row_id = 'tbl_mail' + event.target.parentNode.id.replace(/message/g,'');
	var youtube_vidids = fg_has_youtubeLink(message_row_id);
	
	if(youtube_vidids)
		event.target.parentNode.bgColor = '#FD0000';
}

function fg_topic_row_mouseout(event)
{
	event.target.parentNode.bgColor = '#FDF7DD'; 
}

/*-------------------------------------------------------------------------------------------------------------
	Startup / Init
-------------------------------------------------------------------------------------------------------------*/
var message_table = document.getElementById('messages');

if(message_table != null)
{
	var message_table_rows = message_table.getElementsByTagName('tr');

	for(var i = 0; i < message_table_rows.length; i++)
	{
		jd_addEvent("click", message_table_rows[i], fg_topic_row_click);
		jd_addEvent("mouseover", message_table_rows[i], fg_topic_row_mouseover);
		jd_addEvent("mouseout", message_table_rows[i], fg_topic_row_mouseout);
	}
}