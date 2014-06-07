// ==UserScript==
// @name           Neoboards Auto Bumper
// @namespace      Made by heya on neofriends.net
// @description    Bumps any neoboard you want. Just go to the board, and turn this script on and it will keep bumping the board until you tell it to stop. Great for people selling stuff on the Trading board or Shop Ads board :)
// @include        http://www.neopets.com/neoboards/topic.phtml?topic=*
// ==/UserScript==

function Set_Cookie( name, value, expires, path, domain, secure )
{
// set time, it's in milliseconds
var today = new Date();
today.setTime( today.getTime() );

/*
if the expires variable is set, make the correct
expires time, the current script below will set
it for x number of days, to make it for hours,
delete * 24, for minutes, delete * 60 * 24
*/
if ( expires )
{
expires = expires * 1000 * 60 * 60 * 24;
}
var expires_date = new Date( today.getTime() + (expires) );

document.cookie = name + "=" +escape( value ) +
( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) +
( ( path ) ? ";path=" + path : "" ) +
( ( domain ) ? ";domain=" + domain : "" ) +
( ( secure ) ? ";secure" : "" );
}


function Get_Cookie( check_name ) {
	// first we'll split this cookie up into name/value pairs
	// note: document.cookie only returns name=value, not the other components
	var a_all_cookies = document.cookie.split( ';' );
	var a_temp_cookie = '';
	var cookie_name = '';
	var cookie_value = '';
	var b_cookie_found = false; // set boolean t/f default f

	for ( i = 0; i < a_all_cookies.length; i++ )
	{
		// now we'll split apart each name=value pair
		a_temp_cookie = a_all_cookies[i].split( '=' );


		// and trim left/right whitespace while we're at it
		cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');

		// if the extracted name matches passed check_name
		if ( cookie_name == check_name )
		{
			b_cookie_found = true;
			// we need to handle case where cookie has no value but exists (no = sign, that is):
			if ( a_temp_cookie.length > 1 )
			{
				cookie_value = unescape( a_temp_cookie[1].replace(/^\s+|\s+$/g, '') );
			}
			// note that in cases where cookie is initialized but no value, null is returned
			return cookie_value;
			break;
		}
		a_temp_cookie = null;
		cookie_name = '';
	}
	if ( !b_cookie_found )
	{
		return null;
	}
}

var b_min_wait = Get_Cookie( 'b_min_wait' );
var b_max_wait = Get_Cookie( 'b_max_wait' );
var b_message = Get_Cookie( 'b_message' );
var bump_the_board = Get_Cookie( 'bump_the_board' );

var SECOND = 1000 ;
var MINUTE = 60 * SECOND ;
var MIN = parseInt (b_min_wait);
var MAX = parseInt (b_max_wait);
var PERIODone = (MAX - MIN);	
var PERIODtwo = (PERIODone * Math.random());
var PERIODthree = (PERIODtwo + MIN);
var PERIOD = (PERIODthree * SECOND);

javascript: objt = document.createElement('div'); void(objt.innerHTML ='<table><tr><td></td></tr></table><div id="main_part" class="sidebarModule" style="margin-bottom: 7px;"><table width="158" cellpadding="3" cellspacing="0" border="0" class="sidebarTable"><tr><td valign="middle" class="sidebarHeader medText"><b>Neoboard Bumper</b></td></tr><tr><td class="activePetInfo"><center><div id="buttons_list"><table><tr><td><div id="button_start"><form method="post"><input type="submit" name="start" style="font-size: 7pt;" value="   Start   "></form></div></td><td><div id="button_stop"><form method="post"><input type="submit" name="stop" style="font-size: 7pt;" value="   Stop   "></form></div></td></tr></table></td></tr><tr><td><div id="button_show"><form method="post" action="javascript:"><input type="submit" name="show_submit" style="font-size: 7pt;" value="Edit Settings"></form></div></div></td></tr></table></div>'); void(document.getElementsByClassName('sidebar')[0].appendChild(objt));

javascript: objr = document.createElement('div'); void(objr.innerHTML ='<div id="total" class="sidebarModule" style="margin-bottom: 7px;"><table width="158" cellpadding="3" cellspacing="0" border="0" class="sidebarTable"><tr><td valign="middle" class="sidebarHeader medText"><b>Neo Bumper Settings</b></td></tr><tr><td class="activePetInfo"><center><div><form method="post" action="javascript:"><table id="settings"><tr><td><table><tr><td align="right"><b>Min Wait:</b></td><td align="left"><input type="text" name="min_wait" id="min_wait" size="2" style="font-size: 7pt;" value="'+b_min_wait+'"> Seconds</td></tr><tr><td align="right"><b>Max Wait:</b></td><td align="left"><input type="text" name="max_wait" id="max_wait" size="2" style="font-size: 7pt;" value="'+b_max_wait+'">\n Seconds</td></tr><tr><td align="right"><b>Message:</b></td><td align="left"><input type="text" name="message" id="message" size="12" style="font-size: 7pt;" value="'+b_message+'"></td></tr></table></td></tr><tr><td><center><table><tr><td><input type="submit" name="save_submit" style="font-size: 7pt;" value=" Save "></td><td><input type="submit" name="hide_submit" style="font-size: 7pt;" value=" Cancel " id="change_it"></form></td></tr></table></center></td></tr></table><form method="post" action="javascript:"></td></tr></table></div>'); void(document.getElementsByClassName('sidebar')[0].appendChild(objr));

document.getElementById("total").style.visibility="hidden";

document.getElementById("button_start").style.position="relative";
document.getElementById("button_start").style.left="29px";

document.getElementById("button_stop").style.position="relative";
document.getElementById("button_stop").style.left="-29px";

if (bump_the_board == "1") {
document.getElementById("button_stop").style.visibility="visible";
document.getElementById("button_show").style.visibility="hidden";
document.getElementById("button_start").style.visibility="hidden";
document.getElementsByTagName('textarea')[0].value = b_message
setTimeout("document.forms[6].submit()",PERIOD);
} else {
document.getElementById("button_stop").style.visibility="hidden";
document.getElementById("button_show").style.visibility="visible";
document.getElementById("button_start").style.visibility="visible";
}

document.getElementsByName('hide_submit')[0].addEventListener('click',function (qal_confirmation){
b_min_wait = Get_Cookie( 'b_min_wait' );
b_max_wait = Get_Cookie( 'b_max_wait' );
b_message = Get_Cookie( 'b_message' );
document.getElementById('min_wait').value=b_min_wait;
document.getElementById('max_wait').value=b_max_wait;
document.getElementById('message').value=b_message;
document.getElementById("total").style.visibility="hidden";
document.getElementById("button_show").style.visibility="visible";
}, true);

document.getElementsByName('show_submit')[0].addEventListener('click',function (qal_confirmation){
document.getElementById("total").style.visibility="visible";
document.getElementById("button_show").style.visibility="hidden";
}, true);

document.getElementsByName('save_submit')[0].addEventListener('click',function (qal_confirmation){
var minwait=document.getElementById('min_wait').value;
var maxwait=document.getElementById('max_wait').value;
var message=document.getElementById('message').value;
Set_Cookie( 'b_min_wait', minwait, 30, '/', '', '' );
Set_Cookie( 'b_max_wait', maxwait, 30, '/', '', '' );
Set_Cookie( 'b_message', message, 30, '/', '', '' );
document.getElementById("total").style.visibility="hidden";
document.getElementById("button_show").style.visibility="visible";
}, true);

document.getElementsByName('start')[0].addEventListener('click',function (qal_confirmation){
Set_Cookie( 'bump_the_board',"1", 30, '/', '', '' );
}, true);

document.getElementsByName('stop')[0].addEventListener('click',function (qal_confirmation){
Set_Cookie( 'bump_the_board',"0", 30, '/', '', '' );
}, true);