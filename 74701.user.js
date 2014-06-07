// ==UserScript==
// @name			Pardus Low AP Alert
// @description		Displays an alert when your APs drop below the level you choose, has persistent or one time alert functionality
// @namespace		clubfed.web.officelive.com
// @include			http://*.pardus.at/main.php
// @include			http://*.pardus.at/building.php
// @include			http://*.pardus.at/hack.php
// @include			http://*.pardus.at/ship2ship_combat.php*
// @include			http://*.pardus.at/ship2opponent_combat.php*
// @author			Evil Night
// @version			3.2
// ==/UserScript==


/*Version History:
3.2		Script now works on player vs player and NPC combat screens, user settings exist so the user can enable or disable the showing of the 
		"time until maximum APs" counter individually ( default off for PvP, default on for NPC )
3.1		Added a function to display the time until maximum APs ( default 5000 ). The blocking alert has this information added. User editable settings have
		been added to enable the time until max APs on the building and hack pages ( on by default )
3.0		Script now works on the building and hack pages. 
		Completely rewrote how the script gets the APs remaining from the nav screen ( it's much more efficient now )
2.1.1	Minor fix so the script works when APs left is less than 10.
2.1		Finally fixed the bugs caused by changes in the innerHTML when the text is red or shorter than 4 digits.
2.0		Removed redundant code, Fixed the bug that causes the script not to work when APs are red, added functionality to assess each 
		universe individually.
1.0		Original Release.
*/


//User Editable Settings//
const minAP = 750; //change the number to the level you want your APs to be when you are alerted
const alertonce = true; //change this to false to enable persistent alerts (an alert will display every time the nav screen is refreshed)
const buildingtr = true; //when set to true script displays time to maximum APs on Building page
const hacktr = true; //when set to true script displays time to maximum APs on hack page
const p2pcombattr = false; //when set to true script displays time to maximum APs on player vs player page
const npccombattr = true; //when set to true script displays time to maximum APs on NPC combat page
const maxAP = 5000; // set this to your maximum APs. 6000 max.
const debug = false; //set to true to enable the debug alerts
//End User Editable Settings//

var uni = location.hostname.replace( ".pardus.at", "" );
var AP, time, ticks, days, hours, minutes, seconds = '';

function timetofullAP()
{
	if(maxAP > 6000)
	{
		maxAP = 6000;
	}
	
	ticks = Math.round( ( maxAP-AP ) / 24 );
	seconds = ticks*( 60 * 6 );
	minutes = ( seconds - ( seconds % 60 ) ) / 60;
	hours = ( minutes - ( minutes % 60 ) ) / 60;
	days = ( hours - ( hours % 24 ) ) / 24;
	hours = hours % 24;
	minutes = minutes % 60;
	
	function format( t )
	{
		if ( t < 10 )
		{
			t = "0" + t;
		}
	return t
	}
	
	format( days );
	format( hours );
	format( minutes );
	
	if ( debug == true )
	{
		alert( days + "d " + hours + "h " + minutes + "min." );
	}
	
	return ( "Maximum APs in approximately " + days + "d " + hours + "h " + minutes + "min. ( accuracy 6mins )" )
}

if (debug == true )
{
	alert( window.parent.frames[2].location.pathname )
}

switch ( window.parent.frames[2].location.pathname ) 
{
	case "\/main.php":
	if ( window.parent.frames[2].document.getElementById( 'apsleft' ).firstChild.innerHTML )
	{
		AP = window.parent.frames[2].document.getElementById( 'apsleft').firstChild.innerHTML;
	}
	else
	{
		AP = window.parent.frames[2].document.getElementById( 'apsleft' ).innerHTML;
	}

	if ( debug == true )
	{
		alert( AP );
	}
	break;
	case "\/building.php":
	var form = window.parent.frames[2].document.getElementsByTagName( 'form' );
	AP = form[0].firstChild.innerHTML.replace( 'Your APs: ','' );
	
	if ( buildingtr = true )
	{
		form[0].firstChild.innerHTML += '<br>' + timetofullAP()
	}
	
	if ( debug == true )
	{
		alert( AP );
	}
	break;
	case "\/hack.php":
	var aploc = window.parent.frames[2].document.getElementsByTagName( 'b' );
	AP = aploc[0].innerHTML;
	
	if ( hacktr = true )
	{
		aploc[0].innerHTML += '<br>' + timetofullAP();
	}
	
	if ( debug == true )
	{
		alert( AP );
	}
	break;	

	break;
	case "\/ship2opponent_combat.php":
	var aploc = window.parent.frames[2].document.getElementsByTagName( 'b' );
	AP = aploc[2].innerHTML.replace( 'Your APs: ','' );
	
	if ( npccombattr == true )
	{
		aploc[2].innerHTML += '<br>' + timetofullAP();
	}
	
	if ( debug == true )	
	{
		alert( AP );
	}
	break;
	case "\/ship2ship_combat.php":
	var aploc = window.parent.frames[2].document.getElementsByTagName( 'b' );
	AP = aploc[2].innerHTML.replace( 'Your APs: ','' );
	
	if ( p2pcombattr == true )
	{
		aploc[2].innerHTML += '<br>' + timetofullAP();
	}
	
	if ( debug == true )
	{
		alert( AP );
	}
	break;
}

if ( GM_getValue( uni + "alerted" ) != true && GM_getValue( uni + "alerted" ) != false )
	{
		GM_setValue( uni + "alerted", false );
	}

if ( AP < minAP )
{			
	if ( GM_getValue( uni + "alerted" ) == true )
	{
		if ( alertonce == false )
		{
			GM_setValue( uni + "alerted", false );
		}
	}
	
	if ( GM_getValue( uni + "alerted" ) == false )
			{
				alert( "WARNING\!" + '\n' + "Your APs have fallen below " + minAP + "\!" + '\n' + timetofullAP());
				if ( alertonce == true )
				{
					GM_setValue( uni + "alerted", true );
				}
			}
}
else
{
	GM_setValue( uni + "alerted", false );
}

if ( debug == true )
{
alert( "testing stored GM value" + '\n' + GM_getValue( uni + "alerted" ) )
}
