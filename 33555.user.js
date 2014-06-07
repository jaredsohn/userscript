//-----------------------------------------------------------SHOUTBOX-------------------------------------------------------



// ==UserScript==
// @name           ALIANZA ATENAS
// @description    para alianza atenas, incluye cazaparásitos de minas y el ally sorter
// @include        http://s*.ikariam.*/*
// ==/UserScript==

// ==UserScript==
// @name               IkaResourceSort
// @namespace          tag:rain@synaesthetic.net,2008-09-24:IkaResourceSort
// @description        Ikariam add-on: sorts resource donations properly (by amount, not player name) in v0.2.8
// @version            0.2.8-1.0.2-3
// @include            http://*.ikariam.*/index.php*
// @exclude            http://board.ikariam.*
// @require            http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// ==/UserScript==

/*
	IkaResourceSort v0.2.8-1.0.2-3 - by raindrops
		
	Copyright 2008, D. N. Beverly <rain@synaesthetic.net>
	
	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/*
	CHANGELOG:
		
		2008-10-25
		
		  * Fixed bug with resource upgrade in progress
		
		2008-10-22
		
		  * Fixed bug when dealing with 2 towns on the same island
		  * Reworked leecher checking, added option to change the percentage threshold
		
		2008-09-27
		
		  * Added link to other island resource (to luxury when in saw mill, and vice versa)
		
		2008-09-25
		
		  * Stable version 0.2.8-1.0.1 released
		  * Added leecher checking
		    - based on code from Leecher Checker by Wiisley
		    - Currently only does Breafuios method
		    - Options to enable/disable, and choose colours for good/avg/bad
		  * Added secondary sorting on workers
		  * Added Ikariam version check
		  * Added some error handling/logging
		
		2008-09-24
		  
		  * Original alpha version 0.2.8-1.0.1a released
		  * Basic sorting of player list in saw mill/luxury views
*/

var IKA_VERSION = 'v.0.2.8';
var LINK_TO_OTHER_RESOURCE = true; // adds link to the other island resource in the breadcrumbs div

var ikaVersion, ikaPage;
try {
	// make sure we're on the right Ikariam version
	ikaVersion = $X( "//li[@class='version']" ).textContent;
	if ( ikaVersion != IKA_VERSION ) {
		GM_log( "\nVersion mismatch: This version of IkaResourceSort has only been tested for Ikariam " + IKA_VERSION );
		return;
	}
} catch ( err ) {
	GM_log( err );
	return;
}

var sawmill = new Array();
sawmill[1]  = { WORKERS:45,  WOOD:0,       LEVEL:1 };
sawmill[2]  = { WORKERS:60,  WOOD:350,     LEVEL:2 };
sawmill[3]  = { WORKERS:78,  WOOD:940,     LEVEL:3 };
sawmill[4]  = { WORKERS:99,  WOOD:1950,    LEVEL:4 };
sawmill[5]  = { WORKERS:122, WOOD:3760,    LEVEL:5 };
sawmill[6]  = { WORKERS:147, WOOD:6770,    LEVEL:6 };
sawmill[7]  = { WORKERS:171, WOOD:11580,   LEVEL:7 };
sawmill[8]  = { WORKERS:201, WOOD:18640,   LEVEL:8 };
sawmill[9]  = { WORKERS:231, WOOD:28700,   LEVEL:9 };
sawmill[10] = { WORKERS:263, WOOD:42610,   LEVEL:10 };
sawmill[11] = { WORKERS:294, WOOD:61020,   LEVEL:11 };
sawmill[12] = { WORKERS:329, WOOD:86030,   LEVEL:12 };
sawmill[13] = { WORKERS:363, WOOD:118190,  LEVEL:13 };
sawmill[14] = { WORKERS:398, WOOD:159350,  LEVEL:14 };
sawmill[15] = { WORKERS:435, WOOD:211910,  LEVEL:15 };
sawmill[16] = { WORKERS:473, WOOD:279420,  LEVEL:16 };
sawmill[17] = { WORKERS:512, WOOD:364480,  LEVEL:17 };
sawmill[18] = { WORKERS:551, WOOD:469690,  LEVEL:18 };
sawmill[19] = { WORKERS:591, WOOD:597650,  LEVEL:19 };
sawmill[20] = { WORKERS:633, WOOD:753610,  LEVEL:20 };
sawmill[21] = { WORKERS:675, WOOD:951570,  LEVEL:21 };
sawmill[22] = { WORKERS:719, WOOD:1743410, LEVEL:22 };
sawmill[23] = { WORKERS:763, WOOD:3486820, LEVEL:23 };
sawmill[24] = { WORKERS:806, WOOD:6973640, LEVEL:24 }; // estimated

var luxury = new Array();
luxury[1]  = { WORKERS:30,  WOOD:0,       LEVEL:1 };
luxury[2]  = { WORKERS:50,  WOOD:550,     LEVEL:2 };
luxury[3]  = { WORKERS:74,  WOOD:1660,    LEVEL:3 };
luxury[4]  = { WORKERS:102, WOOD:4100,    LEVEL:4 };
luxury[5]  = { WORKERS:132, WOOD:8640,    LEVEL:5 };
luxury[6]  = { WORKERS:165, WOOD:16260,   LEVEL:6 };
luxury[7]  = { WORKERS:201, WOOD:28920,   LEVEL:7 };
luxury[8]  = { WORKERS:239, WOOD:48580,   LEVEL:8 };
luxury[9]  = { WORKERS:278, WOOD:77340,   LEVEL:9 };
luxury[10] = { WORKERS:320, WOOD:117860,  LEVEL:10 };
luxury[11] = { WORKERS:363, WOOD:172590,  LEVEL:11 };
luxury[12] = { WORKERS:407, WOOD:245010,  LEVEL:12 };
luxury[13] = { WORKERS:453, WOOD:340060,  LEVEL:13 };
luxury[14] = { WORKERS:501, WOOD:462310,  LEVEL:14 };
luxury[15] = { WORKERS:551, WOOD:619870,  LEVEL:15 };
luxury[16] = { WORKERS:600, WOOD:823630,  LEVEL:16 };
luxury[17] = { WORKERS:651, WOOD:1638670, LEVEL:17 };
luxury[18] = { WORKERS:700, WOOD:3268750, LEVEL:18 };
luxury[19] = { WORKERS:751, WOOD:6537500, LEVEL:19 }; // estimated

var LEECH_CHECK     = GM_getValue( 'leech_check', true );
var LEECH_THRESHOLD = GM_getValue( 'leech_threshold', 0.15 );

ikaPage = document.getElementsByTagName('body')[0].id;

if ( ikaPage.match( /^resource|tradegood$/ ) ) {
	if ( LINK_TO_OTHER_RESOURCE ) {
		var container   = $X( "/html/body/div[@id='container']/div[@id='container2']" );
		var breadcrumbs = $X( "./div[@id='breadcrumbs']", container );
		if ( breadcrumbs ) {
			var whereNow = $X( "./a[@class='island']", breadcrumbs );
			var islandParms = whereNow.search.substring(1).split( '&' );
			var islandID;
			for( i = islandParms.length - 1 ; i > -1 ; i-- ) {
				var pair = islandParms[i].split( '=' );
				if ( pair[0] == 'id' ) {
					islandID = pair[1];
					break;
				}
			}
			var toStr;
			var toLink = document.createElement( 'a' );
			toLink.href = '/index.php';
			if ( ikaPage == 'resource' ) {
				toLink.search = '?view=tradegood&type=tradegood&id=' + islandID;
				toStr = '-- Go to ' + GM_getValue( 'luxury_' + islandID, 'Luxury' );
			} else {
				toLink.search = '?view=resource&type=resource&id=' + islandID;
				GM_setValue( 'luxury_' + islandID,
					$X( "./div[@id='mainview']/div[@class='buildingDescription']/h1[1]/text()[1]",
						container ).textContent );
				toStr = '-- Go to Saw Mill';
			}
			toLink.setAttribute( 'title', toStr.substring(3) );
			toLink.appendChild( document.createTextNode( toStr ) );
			var toDiv = document.createElement( 'div' );
			toDiv.style.cssFloat = 'right';
			toDiv.style.paddingRight = '2.1em';
			toDiv.appendChild( toLink );
			breadcrumbs.appendChild( toDiv );
		}
	}

	try {
		var baseXPath = $X( "//div[@id='resourceUsers']" );
		if ( baseXPath )
			var resTable = $X( "./div[1]/table[1]/tbody[1]", baseXPath );
		if ( resTable )
			var tableRows = $x( "./tr", resTable );
		else
			return;
	} catch ( err ) {
		GM_log( err );
		return;
	}
	// now to sort the rows... we have to do a look-behind
	// if the player has more than 1 city on the island
	
	var rows = new Array();
	for ( i = 0 ; i < tableRows.length ; i++ ) {
		var primary = true;
		var row = tableRows[i];
		
		var donationCell = $X( "./td[@class='ownerDonation']", row );
		var donation     = parseInt( donationCell.textContent.replace(/,/g,'').replace(/\s*$/,'') );
		var ownerCell    = $X( "./td[@class='ownerName']", row );
		var owner        = ownerCell.textContent;
		var cityName     = $X( "./td[@class='cityName']", row ).textContent;
		var cityLevel    = $X( "./td[@class='cityLevel']", row ).textContent.replace(/^\s*level\s+/i,'');
		var cityWorkers  = $X( "./td[@class='cityWorkers']", row ).textContent.replace(/\s+workers.*$/i,'');
		cityWorkers      = parseInt( cityWorkers );
		// look-behind
		if ( owner.match( /^\s+$/ ) ) {
			owner    = $X( "./td[@class='ownerName']", tableRows[i-1] ).textContent;
			ownerCell.textContent = owner;
			rows[i-1].WORKERS += cityWorkers;
			primary = false;
			donation =
				$X( "./td[@class='ownerDonation']", tableRows[i-1] ).textContent.replace(/,/g,'').replace(/\s*$/,'');
		}
		rows[i] = { DONATION:donation, OWNER:owner, WORKERS:cityWorkers, ROW:row, PRIMARY:primary };
	}
	
	rows = rows.sort( sortRows );
	
	var tbody = document.createElement( 'tbody' );
	for ( i = 0 ; i < rows.length ; i++ ) {
		var rowCopy;

		rowCopy = LEECH_CHECK ? checkLeecher( rows[i] ) : rows[i].ROW;

		var alt = i % 2 == 0;
		if ( rowCopy.hasAttribute( 'class' ) ) {
			if ( rowCopy.getAttribute('class').match( /(own.*)$/ ) ) {
				rowCopy.setAttribute( 'class', alt ? 'alt ' + RegExp.$1 : RegExp.$1 );
			} else {
				rowCopy.setAttribute( 'class', alt ? 'alt avatar' : 'avatar' );
			}
		}
		tbody.appendChild( rowCopy );
	}
	// replace the table with the new sorted one
	resTable.parentNode.replaceChild( tbody, resTable );
	
} else if ( ikaPage == 'options' ) {
	doOptions();
}

function checkLeecher( obj ) {
	if ( !obj.PRIMARY )
		return obj.ROW;
	var workplace;
	if ( ikaPage == 'resource' ) {
		workplace = sawmill;
	} else if ( ikaPage == 'tradegood' ) {
		workplace = luxury;
	}
	
	var workers = parseInt( obj.WORKERS );
	/* check resource level */
	var workplaceLevel = parseInt( $X( "/html//div[@id='resUpgrade']/div[1]/div[1]/text()" ).textContent );
	if ( isNaN( workplaceLevel ) ) {
		var tmp = $X( "//div[@id='resUpgrade']/div[1]/div[2]" ).textContent;
		if ( tmp.match( /(\d+)/ ) )
			workplaceLevel = parseInt( RegExp.$1 );
	}
	
	var workerCeiling = workplace[workplaceLevel].WORKERS;
	var realWorkers = workers > workerCeiling ? workerCeiling : workers;
	
	for ( var j = 1 ; j < workplace.length ; j++ ) {
		if ( realWorkers <= workplace[j].WORKERS )
			break;
	}
	var percentage = parseInt( workplace[j].WOOD ) > 0 ?
		parseInt( obj.DONATION ) / ( LEECH_THRESHOLD * workplace[j].WOOD ) : 'none';
	var color;
	if ( percentage == 'none' )
		color = GM_getValue( 'color_good', 'green' );
	else if ( percentage < 0.95 )
		color = GM_getValue( 'color_bad', 'red' );
	else if ( percentage < 1.05 )
		color = GM_getValue( 'color_ok', 'blue' );
	else
		color = GM_getValue( 'color_good', 'green' );
	
	var dCell = $X( "./td[@class='ownerDonation']", obj.ROW );
	dCell.style.color = color;
	
	return obj.ROW;
}

function sortRows( a, b ) {
	var donationA = a.DONATION;
	var donationB = b.DONATION;
	var workersA  = a.WORKERS;
	var workersB  = b.WORKERS;
	
	return donationA == donationB ?
		workersB  - workersA :
		donationB - donationA;
}


function doOptions () {
	var optDebug = $X( "//div[@id='options_debug']" );
	if ( optDebug != null ) {
		var color_good 	    = GM_getValue( 'color_good', 'green' );
		var color_ok  	    = GM_getValue( 'color_ok',  'blue' );
		var color_bad  	    = GM_getValue( 'color_bad',  'red' );
		var leech_check     = GM_getValue( 'leech_check', true );
		var leech_threshold = GM_getValue( 'leech_threshold', 0.15 );
		var color_list      = ['green','blue','red','orange','yellow'];
		
		var div = document.createElement( 'div' );
		div.setAttribute( 'id', 'ika_resource_sort' );
		div.appendChild( document.createElement( 'h3' ) );
		div.firstChild.appendChild( document.createTextNode( 'IkaResourceSort options' ) );
		var table = document.createElement( 'table' );
		table.setAttribute( 'cellspacing', 0 );
		table.setAttribute( 'cellpadding', 0 );
		var tbody = document.createElement( 'tbody' );
		var leech = document.createElement( 'INPUT' );
		leech.type = 'checkbox';
		leech.checked = leech_check;
		leech.value = 'leech';
		leech.id = 'leech';
		leech.addEventListener( 'change',
			function (event) {
				GM_setValue('leech_check',leech.checked);
				var sel_list = ['leech_threshold', 'color_good', 'color_ok', 'color_bad'];
				for ( i = 0 ; i < sel_list.length ; i++ ) {
					var sel = document.getElementsByName( sel_list[i] );
					sel[0].disabled = !leech.checked;
				}
			}, false
		);
		
		
		/* ****************************************************
			TO DO - change strings to vars to accomodate i18n
		******************************************************* */

		tbody.appendChild( $tr( 'Enable leecher checking', leech ) );
		tbody.appendChild( $tr( 'Donation percentage',
			$sel( [0.05, 0.1, 0.15, 0.2, 0.25], leech_threshold, 'leech_threshold', $callback ) ) );
		tbody.appendChild( $tr( '"Good" color (not leecher)',
			$sel( color_list, color_good, 'color_good', $callback ) ) );
		tbody.appendChild( $tr( '"Average" color',
			$sel( color_list, color_ok, 'color_ok', $callback ) ) );
		tbody.appendChild( $tr( '"Bad" color (*leecher*)',
			$sel( color_list, color_bad, 'color_bad', $callback ) ) );
		table.appendChild( tbody );
		div.appendChild( table );
		optDebug.parentNode.insertBefore( div, optDebug );
	}
}

function $callback (event) {
	var it = event.target.id;
	GM_setValue( it, event.target.value );
}

function $sel ( opts, val, id, change ) {
	// change should be a callback for eventListener
	var sel = document.createElement( 'SELECT' );
	sel.size = 1;
	if ( id ) {
		sel.id = id;
		sel.name = id;
	}
	for ( var i = 0 ; i < opts.length ; i++ ) {
		var opt = document.createElement( 'OPTION' );
		opt.appendChild( document.createTextNode( opts[i] ) );
		opt.setAttribute( 'value', opts[i] );
		if ( opts[i] == val )
			opt.setAttribute( 'selected', 'selected' );
		sel.appendChild( opt );
	}
	if ( change ) {
		try {
			sel.addEventListener( 'change', change, true );
		} catch (err) {
			GM_log(err);
		}
	}
	return sel;
}

function $tr ( txt, obj ) {
	var tr1 = document.createElement( 'tr' );
	var th1 = document.createElement( 'th' );
	var td1 = document.createElement( 'td' );
	th1.appendChild( document.createTextNode( txt ) );
	try {
		td1.appendChild( obj );
	} catch(err) {
		GM_log(err);
	}
	with ( tr1 ) {
		appendChild( th1 );
		appendChild( td1 );
	}
	return tr1;
}

//-------------------------------------------------------------CAZAPARASITOS--------------------------------------------------

// ==UserScript==
// @name           Cazaparasitos de minas
// @namespace      http://ikariam.feanturi.nl
// @description    Anadido link al signif de los colores. indica segun color al parasito.
// @include       	 http://s*.ikariam.*/*
// @exclude        	http://board.ikariam.*/*
// ==/UserScript==

/**
*	Parses a string of format 123,456 to an int in format 123456
*/
function toInt(string)
{
	var temp,result;
	temp = string.split(',');
	result = '';
	for(var i=0; i < temp.length; i++)
	{
		result += temp[i];
	}
	return parseInt(result);
}
/**
*	Depending on how well a person donates, he gets a color:
*	0-90		Leecher, color is red
*	90-100	Sort of leecher, color is blue
*	100-110	Donates enough, color is orange
*	110 - ??	Good donater, coller is green
*/
function getLeecherStatus(percentage)
{
	if (percentage > 110)
		return 'green';
	if (percentage >= 100)
		return 'orange';
	if (percentage >= 90)
		return 'blue';
	if (percentage == undefined) //error value
		return 'black';
	return 'red';
}

window.addEventListener('load',  function() 
{ 
try
{
	// The id of the body tag contains which page you are on
	var page = document.getElementsByTagName('body')[0].id;
	
	// Check if you are at a resource deposit
	if ( (page == 'tradegood') || (page == 'resource') )
	{
		// get the donation list
		var donationList = document.getElementById('mainview');
		if (document.getElementById('mainview').childNodes[5]) {
			donationList = document.getElementById('mainview').childNodes[5].childNodes[1];
		} else {
			donationList = document.getElementById('mainview').childNodes[3].childNodes[1];
		}
		
		
		var name, playerName, donated, lvl, workers, percentage, param, method;
		
		// Depending on the type of resource, get the right variables
		if (page == 'resource') 
		{
			method = GM_getValue("method_building",1);
			param = GM_getValue("param_building",15);
			workplace = new Array();
			// 					    	 Workers / 	     lvl up / 	cumulative
			workplace[1]  = new Array( 30,       0,       0);
			workplace[2]  = new Array( 40,     350,     350);
			workplace[3]  = new Array( 52,     590,     940);
			workplace[4]  = new Array( 66,    1010,    1950);
			workplace[5]  = new Array( 81,    1810,    3760);
			workplace[6]  = new Array( 98,    3010,    6770);
			workplace[7]  = new Array(114,    4810,   11580);
			workplace[8]  = new Array(134,    7060,   18640);
			workplace[9]  = new Array(154,   10060,   28700);
			workplace[10] = new Array(175,   13910,   42610);
			workplace[11] = new Array(196,   18410,   61020);
			workplace[12] = new Array(219,   25010,   86030);
			workplace[13] = new Array(242,   32160,  118190);
			workplace[14] = new Array(265,   41160,  159350);
			workplace[15] = new Array(290,   52560,  211910);
			workplace[16] = new Array(315,   67510,  279420);
			workplace[17] = new Array(341,   85060,  364480);
			workplace[18] = new Array(367,  105210,  469690);
			workplace[19] = new Array(394,  127960,  597650);
			workplace[20] = new Array(422,  155960,  753610);
			workplace[21] = new Array(450,  197960,  951570);
			workplace[22] = new Array(479,  791840, 1743410);
			workplace[23] = new Array(-1, 1583680, 3327090);
		}
		else
		{
			method = GM_getValue("method_luxury",1);
			param = GM_getValue("param_luxury",15);
			workplace = new Array();
			// 					    	 Workers / 	     lvl up / 	cumulative
			workplace[1]  = new Array( 20,       0,       0);
			workplace[2]  = new Array( 33,     550,     550);
			workplace[3]  = new Array( 49,    1110,    1660);
			workplace[4]  = new Array( 68,    2440,    4100);
			workplace[5]  = new Array( 88,    4540,    8640);
			workplace[6]  = new Array(110,    7620,   16260);
			workplace[7]  = new Array(134,   12660,   28920);
			workplace[8]  = new Array(159,   19660,   48580);
			workplace[9]  = new Array(185,   28760,   77340);
			workplace[10] = new Array(213,   40520,  117860);
			workplace[11] = new Array(242,   54730,  172590);
			workplace[12] = new Array(271,   72420,  245010);
			workplace[13] = new Array(302,   95050,  340060);
			workplace[14] = new Array(334,  122250,	462310);
			workplace[15] = new Array(367,  157560,  619870);
			workplace[16] = new Array(400,  203760,  823630);
			workplace[17] = new Array(434,  815040, 1638670);
			workplace[18] = new Array(-1,  1630080, 3268750);
		}
		
		for (var j = 1; j < donationList.rows.length; j+=cities)
		{
			// Name | Player name | Donated | Level | Number of workers | Actions
			name = donationList.rows[j].cells[0].innerHTML;
			playerName = donationList.rows[j].cells[1].innerHTML;
			donated = toInt(donationList.rows[j].cells[2].innerHTML);
			lvl = donationList.rows[j].cells[3].innerHTML.split(' ')[1];
			workers = donationList.rows[j].cells[4].innerHTML.split(' ')[0];
			
			// Check how many cities this player has
			var j2 = j;
			var cum_city_lvl = 0;
			while ( (j2 < donationList.rows.length) && (playerName == donationList.rows[j2].cells[1].innerHTML) )
			{
				j2++;
				cum_city_lvl += toInt(donationList.rows[j2-1].cells[3].innerHTML.split(' ')[1]);
			}
			cities = j2-j;

			if (method == 1) //Breafuios
			{	
				// Check which level is used
				for(workers_lvl = 1; workers_lvl < 19; workers_lvl++)
				{
					if (workers <= 1.5 * workplace[workers_lvl][0])
						break;
				}
				percentage = (donated / (workplace[workers_lvl][2]*param/100)) * 100;
			}
			else if (method == 2) // Thousand rule
			{
				percentage = (donated / cum_city_lvl) / param * 100;
			}
			else // Chadoios
			{
				// Check which level the deposit is
				var lvl = document.body.childNodes[4].childNodes[1].childNodes[17].childNodes[3].childNodes[3].innerHTML.split("</span>")[1];
				
				if (lvl == undefined) // Deposit is upgrading
					lvl = document.body.childNodes[4].childNodes[1].childNodes[17].childNodes[3].childNodes[5].innerHTML.split("</span>")[1];
				
				lvl = parseInt(lvl);
				percentage = ((donated/cities) / (workplace[lvl+1][2]*param/100)) * 100;
			}
			
			for (j2 = 0; j2 < cities; j2++)
			{
				donationList.rows[j+j2].style.color = getLeecherStatus(percentage);
			}
		}

	}
	
	// Add options menu
	if (page == 'options')
	{
		var allElements = document.getElementsByTagName('form');

		for (var i = 0; i < allElements.length; i++)
		{
		    var thisElement = allElements[i];
			if (thisElement.elements[0].value == 'Options')
			{
				var breafious_building, thousand_building, chadoios_building, breafious_luxury,thousand_luxury, chadoios_luxury;
				var method_building = GM_getValue('method_building','1');
				var param_building 	= GM_getValue('param_building','15');
				var method_luxury 	= GM_getValue('method_luxury','1');
				var param_luxury 	= GM_getValue('param_luxury','15');

				if (method_building == 1)
					breafious_building = "checked='checked'";
				if (method_building == 2)
					thousand_building =  "checked='checked'";
				if (method_building == 3)
					chadoios_building =  "checked='checked'";
				if (method_luxury == 1)
					breafious_luxury = "checked='checked'";
				if (method_luxury == 2)
					thousand_luxury =  "checked='checked'";
				if (method_luxury == 2)
					chadoios_luxury =  "checked='checked'";
				var div;
				div = document.createElement('div');
				div.innerHTML = 
					"<div id='leecher_checker'>"+
						"<h3>Leecher Checker v1.2.1 options</h3>"+
						"<table cellpadding='0' cellspacing='0'>"+
							"<tr>"+ 
								"<td align='center' colspan='2'><i>Building Material</i></td>"+
							"</tr>"+	
							"<tr>"+
									"<th>Method:</th>"+
								"<td>"+
									"<input id='radio_1'  type='radio' class='radio' name='method_building' value='1' "+breafious_building+"/> Breafious<br />"+
									"<input id='radio_2'  type='radio' class='radio' name='method_building' value='2' "+thousand_building+" /> Thousand rule<br />"+
									"<input id='radio_3'  type='radio' class='radio' name='method_building' value='3' "+chadoios_building+" /> Chadoios"+
								"</td>"+
					        "</tr>"+
							"<tr>"+
								"<th>Param:</th>"+
								"<td><input id='text_1' type='textfield' class='textfield' name='param_building' size='10' value="+param_building+" /></td>"+
							"</tr>"+
							"<tr>"+ 
								"<td align='center' colspan='2'><i>Luxury Resource<i></td>"+
							"</tr>"+
							"<tr>"+
								"<th>Method:</th>"+
								"<td>"+
									"<input id='radio_4' type='radio' class='radio' name='method_luxury' value='1' "+breafious_luxury+"/> Breafious<br />"+
									"<input id='radio_5' type='radio' class='radio' name='method_luxury' value='2' "+thousand_luxury+" /> Thousand rule<br />"+
									"<input id='radio_6'  type='radio' class='radio' name='method_luxury' value='3' "+chadoios_building+" /> Chadoios"+
								"</td>"+
							"</tr>"+
							"<tr>"+
								"<th>Param:</th>"+
								"<td><input id='text_2' type='textfield' class='textfield' name='param_luxury' size='10' value="+param_luxury+" /></td>"+
							"</tr>"+
				        "</table>"+
				    "</div>";
				
				thisElement.insertBefore(div, document.getElementById('options_debug'));
	            
							document.getElementById('radio_1').addEventListener('change',function(event){GM_setValue('method_building','1');document.getElementById('text_1').value='15';GM_setValue('param_building','15')},true);
	            document.getElementById('radio_2').addEventListener('change',function(event){GM_setValue('method_building','2');document.getElementById('text_1').value='1000';GM_setValue('param_building','1000')},true);
				document.getElementById('radio_3').addEventListener('change',function(event){GM_setValue('method_building','3');document.getElementById('text_1').value='15';GM_setValue('param_building','15')},true);
	            document.getElementById('radio_4').addEventListener('change',function(event){GM_setValue('method_luxury','1');document.getElementById('text_2').value='15';GM_setValue('param_luxury','15')},true);
	            document.getElementById('radio_5').addEventListener('change',function(event){GM_setValue('method_luxury','2');document.getElementById('text_2').value='1000';GM_setValue('param_luxury','1000')},true);
				document.getElementById('radio_6').addEventListener('change',function(event){GM_setValue('method_luxury','3');document.getElementById('text_2').value='15';GM_setValue('param_luxury','15')},true);
	            document.getElementById('text_1').addEventListener('change',function(event){GM_setValue('param_building',document.getElementById('text_1').value)},true);
	            document.getElementById('text_2').addEventListener('change',function(event){GM_setValue('param_luxury',document.getElementById('text_2').value)},true);
			}
		}
	}
}
catch(er)
				{alert(er)}
},
    true);


//-----------------------------------------------------

// ==UserScript==
// @name           ATENAS
// @namespace      ikatips
// @description    Herraminetas para la alianza 
// @include        http://*ikariam.*/index.php*
// @author         Original por Verx - Modificado por ALEX para ALIANZAS COA -
// @version        20080619 120713 
// ==/UserScript==

var tagsAModificar = new Array("A","SPAN");
var diaLimite     = 2;
var cookieIKO    = 'IKAFONT';
var cookie_SEPARA    = '|';
var css_MenuIKO_String = '#menu {'+
'align:right;'+
'margin-left:680px;'+
'margin-top: -16.5px;'+
'color:white;'+
'width: 50px;'+
'cursor: hand;'+
'}'+
'#menu ul {'+
'list-style: none;'+
'margin: 0;'+
'padding: 0;'+
'width: 13em;'+
'}'+
'#menu a, #menu h2 {'+
'font: bold 11px/16px arial, helvetica, sans-serif;'+
'display: block;'+
'margin: 0;'+
'padding: 2px 3px;'+
'cursor: hand;'+
'}'+
'#menu a {'+
'color: RGB(84,44,15);'+
//Colores menu normal.
'background: RGB(246,235,188);'+
'border: double 3px RGB(84,44,15);'+
'border-left: double 3px RGB(84,44,15);'+
'border-right: double 3px RGB(84,44,15);'+
'text-decoration: none;'+
'}'+
'#menu a:hover {'+
'color: RGB(84,44,15);'+
//Color menu seleccionado.
'background: RGB(222,180,120);'+
'border: double 3px RGB(84,44,15);'+
'}'+
'#menu li {position: relative; }'+
'#menu ul ul {'+
'position: relative;'+
'z-index: 500;'+
'}'+
'#menu ul ul ul {'+
'position: absolute;'+
'top: 0;'+
'left: 100%;'+
'}'+
'div#menu ul ul,'+
'div#menu ul li:hover ul ul,'+
'div#menu ul ul li:hover ul ul'+
'{display: none;}'+
'div#menu ul li:hover ul,'+
'div#menu ul ul li:hover ul,'+
'div#menu ul ul ul li:hover ul'+
'{display: block;}';
//esta caracterÃ­stica es casi estÃ¡ndar, utilizado en muchos scripts de Greasemonkey
if(!window.add_Global_Style){
       function add_Global_Style(css) {
               var head, style;
               head = document.getElementsByTagName('head')[0];
               if (!head) { return; }
               style = document.createElement('style');
               style.type = 'text/css';
               style.innerHTML = css;
               head.appendChild(style);
       }
}

function getAlltagsAModificar(){

var arrResult = new Array();
var lastI     = 0;
var xTags     = null;

for (tagX = 0; tagX<tagsAModificar.length; tagX++) {
xTags = document.getElementsByTagName(tagsAModificar[tagX]);
for(i=0;i<xTags.length;i++){arrResult[lastI] = xTags[i];lastI++;}
}

return arrResult;

}

unsafeWindow.setFontIka = function () {
 var FamilyIndex = document.getElementById("Family").selectedIndex;
 var FI = document.getElementById("Family").options[FamilyIndex].text;
 changeAllFamily(FI);
 var SizeIndex = document.getElementById("Size").selectedIndex;
 var SI = document.getElementById("Size").options[SizeIndex].text;
 changeAllSize(SI);
 var ColorIndex = document.getElementById("Color").selectedIndex;
 var CI = document.getElementById("Color").options[ColorIndex].text;
 changeAllColor(CI);
 createCookie(cookieIKO,FI+cookie_SEPARA+SI+cookie_SEPARA+CI,diaLimite);
}
function createCookie(name,value,days) {
       if (days) {
               var date = new Date();
               date.setTime(date.getTime()+(days*24*60*60*1000));
               var expires = "; expires="+date.toGMTString();
       }
       else var expires = "";
       document.cookie = name+"="+value+expires+"; path=/";
}
function readCookie(c_name) {
       if (document.cookie.length>0)
 {
 c_start=document.cookie.indexOf(c_name + "=");
 if (c_start!=-1)
   {
   c_start=c_start + c_name.length+1;
   c_end=document.cookie.indexOf(";",c_start);
   if (c_end==-1) c_end=document.cookie.length;
   return unescape(document.cookie.substring(c_start,c_end));
   }
 }
       return "";
}
function initFont(){
var rC     = readCookie(cookieIKO);
if (rC){
var myFont = rC.split(cookie_SEPARA);
changeAllFamily(myFont[0]);
changeAllSize(myFont[1]);
changeAllColor(myFont[2]);
}
}
function eraseCookie(name) {
       createCookie(name,"",-1);
}
function changeAllFamily(valueOfSelect){
var dataToChange = getAlltagsAModificar();
for (i=0;i<dataToChange.length;i++){
 dataToChange[i].style.fontFamily = valueOfSelect;
}
}
function changeAllSize(valueOfSelect){
var dataToChange = getAlltagsAModificar();
for (i=0;i<dataToChange.length;i++){
 dataToChange[i].style.fontSize = valueOfSelect;
}
}
function changeAllColor(valueOfSelect){
var dataToChange = getAlltagsAModificar();
for (i=0;i<dataToChange.length;i++){
 dataToChange[i].style.color = valueOfSelect;
}
}
unsafeWindow.clearFont = function(){
eraseCookie(cookieIKO);
window.location.reload();
}
function addIKOS_ToolsMenu(){

var xTags = document.getElementsByTagName('LI');
var xLi   = null;
var IKOSTools_Link       = document.createElement('LI');
IKOSTools_Link.setAttribute('id', 'IKOSTools');

for(i=0;i<xTags.length;i++){
xLi = xTags[i];
if (xLi.className == 'help') {
xLi.parentNode.appendChild(IKOSTools_Link,xLi);
add_Global_Style(css_MenuIKO_String);
document.getElementById('IKOSTools').innerHTML =
'<div id="menu">'
+ '<ul>'
+ ' <li><h2>COLOR MINA</h2>'
+ '   <ul>'
+ '     <li><a target="_blank" href="http://img135.imageshack.us/img135/6504/dibujosw2.png" title=" Colores minas " align="left">&nbsp;colores minas</a></li>'
+ '     <li><a target="_blank" href="http://lacoalicion.foroactivo.com.es/radiotelevision-y-pagexterna-de-la-alianza-f7/radio-la-coalicion-t36.htm" title=" Radio " align="left">&nbsp;Radio</a></li>'
+ '     <li><a target="_blank" href="http://alianzaatenas.creatuforo.com/portal.php" title=" ATENAS " align="left">&nbsp;atenas</a></li>'
+'</ul>'
+'</DIV>';

'<div id="menu">'
+ '<ul>'
+ ' <li><h3>FORO ATENAS</h3>'
+ '   <ul>'
+ '     <li><a target="_blank" href="http://alianzaatenas.creatuforo.com/portal.php" title="foro atenas" align="left">&nbsp;foro atenas</a></li>'

+'</DIV>';break;
}}}

addIKOS_ToolsMenu();




//--------------------------------------------------------------PUNTUACIONES-----------------------------------------------



//
// version 0.6.6
// 2008-04-05
// Copyright (c) 2008
// Original Script by: ImmortalNights
// Special Enhancements: wphilipw, ecamanaut
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "IkariamScoreLinker", and click Uninstall.
//
// --------------------------------------------------------------------
//
// Version History:
// 0.3.0: Original Public Release
// ==================================================
// 0.4.0: Island View & Bugfixes
// 0.4.1: Description change, Generals Version update
// 0.4.5: Bugfixes, Script combination (versions)
// 0.4.6: Changed the image sizes to 16x16
// 0.4.7: Implemented 'checkAlreadyShown' to prevent the icon displaying multiple times
// ==================================================
// 0.5.0: Inline Score Display Option (AJAX)
// 0.5.2: Defaults of text inline now set. Icons and text have headers. Options link always shown
// 0.5.3: Code clean up, Money Score option & Options dialog
// 0.5.4: Previous score details are saved, so that they are not updated if the same town is viewed.
// 0.5.5: BugFix for multiple scores + timeout for saved scores (10min)
// 0.5.6: BugFix: "undefined" scores (timestamp too long, now stored in string)
// 0.5.7: Options on Options page, no longer inline
// ==================================================
// 0.6.0: Saves scores in the page after loading them once. Code cleanup. Does not try to run on the forums.
// 0.6.1: Shows max lootable gold, according to a formula by Lirave. Keyboard selection via (shift)tab, or j/k.
// 0.6.2: Removed the 'Change Options' link and the 'loot:' prefix on lootable gold.
// 0.6.3: Made the 'Change Options' link configurable. Bugfixed non-inline links. (And loot is back; sorry. ;-)
// 0.6.4: Bugfix for confusion when Kronos Utils adds info to the town size field. Also made sure Gold Scores don't wrap even if their contents get long.
// 0.6.5: Paints demilitarized (but neither allied nor your own) cities yellow.
// 0.6.6: Added some more key bindings: d/t/p/b/s, for all(?) the city actions.
//
// --------------------------------------------------------------------
//
// This script places an icon to the right of a players
// name after selecting their town on the Island overview,
// or when viewing their Town. This icon links the user to
// the scoreboard, where you can see the players score.
//
// Feel free to have a go yourself; as long as you leave
// a little credit, and of course publish for the players
// of Ikariam!
//
// This script was originally created by ImmortalNights,
// and further edited and enhanced by wphilipw and ecmanaut.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           IkariamScoreLinker
// @namespace      ikariamScript
// @description    Adds a link to the Scoreboard besides a players name after selecting their town on th Island Overview or when viewing their Town
// @include        http://*.ikariam.*/*
// @exclude        http://board.ikariam.*/*
// ==/UserScript==

/*
The startup functions and global variables.
Original Author: ImmortalNights & wphilipw
For version: 0.3.0
Last changed: 0.6.0
*/

var show = { gold: 4, military: 2, total: 1 };
var post = {
    total: "score",
 military: "army_score_main",
     gold: "trader_score_secondary"
};

var saving;
var gameServer = location.host;
var valueCache = eval(GM_getValue(gameServer, "({})"));
var changeLink = GM_getValue("link", true);
var whatToShow = GM_getValue("show", "7");
var inlineScore = GM_getValue("inline", true);

if ($("options_changePass"))
  displayOnOptions_fn();
else
  init();

function init() {
  function maybeLookup(e) {
    var n = $X('.//span[@class="textLabel"]', e.target);
    var ul = $X('ancestor-or-self::li[1]/ul[@class="cityinfo"]', e.target);
    if ($X('li[contains(@class," name")]', ul)) return; // already fetched!
    var who = $X('li[@class="owner"]/text()[preceding::*[1]/self::span]', ul);
    var name = trim(who.textContent);
    fetchScoresFor(name, ul, n, number(n.parentNode.id));
  }
  function lookupOnClick(a) {
    onClick(a, function(e) { setTimeout(maybeLookup, 10, e); });
  }
  function peek(e) {
    var on = e.target;
    cities.map(click);
    if (/^a$/i.test(on.nodeName))
      click(on);
  }

  if ("island" == document.body.id) {
    GM_addStyle(<><![CDATA[#island #information .messageSend img {
      position: absolute;
      margin: -3px 0 0 4px;
    }]]></>.toXMLString());
    var id = location.href.match(/[&?]id=(\d+)/);
    if (id) id = id[1];
  }
  var cities = getCityLinks();
  if (cities.length) {
    cities.forEach(lookupOnClick);
    var body = document.body;
    addEventListener("keypress", keyboard, true);
    return inlineScore && onClick(body, peek, 0, "dbl");
  }
  var player = itemValue("owner");
  if (player)
    fetchScoresFor(player, null, null, id);
}

function saveCache() {
  //console.log("Saving cache: %x", uneval(valueCache));
  GM_setValue(gameServer, uneval(valueCache).replace(/ /g, ""));
}

function cacheValue(id, type, value) {
  //console.log("caching", id, type, value);
  var city = valueCache[id] || {};
  type = type.charAt();
  city[type] = number(value);
  city.T = time();
  valueCache[id] = city;
  saving && clearTimeout(saving);
  saving = setTimeout(saveCache, 1e3);
}

function focus(direction) {
  var all = getCityLinks();
  var now = unsafeWindow.selectedCity;
  var cur = $X('id("cityLocation'+ now +'")/a') || all[all.length - 1];
  if (all.length) {
    now = all.map(function(a) { return a.id; }).indexOf(cur.id);
    click(all[(now + direction + all.length * 3) % all.length]);
  }
}

function keyboard(e) {
  function invoke(a) {
    a = $X('id("actions")/ul[@class="cityactions"]/li[@class="'+ a +'"]/a');
    return function() { if (a && a.href) location.href = a.href; };
  }
  function counterClockwise() { focus(-1); }
  function clockwise() { focus(1); }
  function tab() {
    if (!e.altKey && !e.ctrlKey && !e.metaKey)
      focus(e.shiftKey ? -1 : 1);
  }

  var keys = {
    "\t": tab, j: counterClockwise, k: clockwise,
    d: invoke("diplomacy"), t: invoke("transport"),
    p: invoke("plunder"), b: invoke("blockade"), s: invoke("espionage")
  };

  var action = keys[String.fromCharCode(e.keyCode || e.charCode)];
  if (action) {
    e.stopPropagation();
    e.preventDefault();
    action();
  }
}

function fetchScoresFor(name, ul, n, id) {
  function searchbutton(type) {
    var url = "url(/skin/" + ({
       total: "layout/medallie32x32_gold.gif) no-repeat -7px -9px",
    military: "layout/sword-icon2.gif) no-repeat 0 2px;",
        gold: "resources/icon_gold.gif) no-repeat 0 0; width:18px"
      })[type];
    return <input type="submit" name="highscoreType"
      value=" " title={"View player's "+ type +" score"}
      style={"border: 0; height: 23px; width: 16px; cursor: pointer; " +
             "color: transparent; background:"+ url}
      onclick={"this.value = '"+ post[type] +"'; this.form.submit();"}/>;
  }

  var scores = changeLink &&

    <a href="/index.php?view=options"
      title="Change options">Change options</a>;

  if (!inlineScore) {
    var form = <form action="/index.php" method="post">
      <input type="hidden" name="view" value="highscore"/>
      <input type="hidden" name="" id="searchfor"/>
      <input type="hidden" name="searchUser" value={name}/>
    </form>;
    for (var type in post)
      if (whatToShow & show[type])
        form.* += searchbutton(type);
    if (changeLink) {
      scores.@style = "position: relative; top: -6Px;";
      form.* += scores;
    }
    form.@style = "position: relative; "+ (changeLink ? "left:-26px; " : "") +
      "white-space: nowrap;";
    scores = form;
  }

  if (!inlineScore || changeLink)
    addItem("options", scores, ul);
  if (!inlineScore) return;

  for (type in show) {
    if (!(whatToShow & show[type]))
      continue;
    if ("gold" == type && isMyCity(ul) && viewingRightCity(ul)) {
      var gold = $("value_gold").innerHTML;
      updateItem(type, gold, cityinfoPanel(), null, lootable(gold));
      continue;
    }
    addItem(type, "fetching...");
    requestScore(name, type, id, makeShowScoreCallback(name, type, ul, n, id));
  }
}

function isMyCity(ul, name) {
  if ("city" == document.body.id)
    return $X('id("position0")/a').href != "#";

  var name = getItem("owner", ul);
  var a = $X('a', name);
  if (a) {
    var id = a.search.match(/destinationCityId=(\d+)/)[1];
    return $X('id("citySelect")/option[@value="'+ id +'"]');
  }
  var city = itemValue("name", ul);
  return $X('id("citySelect")/option[.="'+ city +'"]');
}

function lootable(score, ul) {
  var amount = parseInt((score||"").replace(/\D+/g, "") || "0", 10);
  var panel = getItem("citylevel");
  var level = getItem("citylevel", ul);
  var size = itemValue(level);
  var max = Math.round(size * (size - 1) / 10000 * amount);
  if (isNaN(max)) return;
  max = node("span", "", null, "\xA0("+ fmtNumber(max) +"\)");
  max.title = "montant d'or percu dans cette ville";
  return max;
}

function viewingRightCity(ul) {
  return itemValue("name") == itemValue("name", ul) &&
        itemValue("owner") == itemValue("owner", ul);
}

function makeShowScoreCallback(name, type, ul, n, id) {
  return function showScore(xhr, cached) {
    var score = xhr;
    if ("yes" == cached) {
      score = fmtNumber(score);
    } else { // need to parse out the score
      score = $X('.//div[@class="content"]//tr[td[@class="name"]="' +
                 name + '"]/td[@class="score" or @class="Â§"]',
                 node("div", "", null, xhr.responseText));
      score = score.innerHTML;
    }
    if (score) {
      if ("yes" != cached) cacheValue(id, type, score);

      ul = ul || cityinfoPanel();
      if (n && "0" == score && "military" == type) {
        n.style.fontWeight = "bold"; // n.style.fontStyle = "italic";
        n = $X('../preceding-sibling::div[@class="cityimg"]', n);
        if (n)
          n.style.backgroundImage = getComputedStyle(n,"").
            backgroundImage.replace("red.gif", "yellow.gif");
      }

      // You rob gold (size * (size - 1)) % of the treasury of the city:
      if ("gold" == type)
        var max = lootable(score, ul);

      updateItem(type, score, ul, !!n, max);
    }
  };
}

function getCityLinks() {
  return $x('id("cities")/li[contains(@class,"city level")]/a');
}

function itemValue(item, ul) {
  var li = "string" == typeof item ? getItem(item, ul) : item;
  var xpath = 'text()[preceding-sibling::*[1]/self::span[@class="textLabel"]]';
  var text = $X(xpath, li);
  return text && trim(text.textContent || "");
}

function getItem(type, ul) {
  return $X('li[contains(concat(" ",normalize-space(@class)," ")," '+
            type +' ")]', ul || cityinfoPanel());
}

function mkItem(type, value) {
  var li = node("li", type + " name", null, value);
  var title = (type in show) ?
    type.charAt().toUpperCase() + type.slice(1) + " Score:" : "Scores:";
  li.insertBefore(node("span", "textLabel", null, title), li.firstChild);
  return li;
}

function addItem(type, value, save) {
  var li = getItem(type);
  if (li) {
    li.lastChild.nodeValue = value;
  } else {
    var ul = cityinfoPanel();
    var next = $X('li[@class="ally"]/following-sibling::*', ul);
    ul.insertBefore(li = mkItem(type, value), next);
  }
  if (save && !getItem(type, save)) {
    next = $X('li[@class="ally"]/following-sibling::*', save);
    save.insertBefore(li.cloneNode(true), next);
  }
  return li;
}

function updateItem(type, value, ul, islandView, append) {
  var li = getItem(type, ul);
  if (li) {
    li.lastChild.nodeValue = value;
  } else {
    var next = $X('li[@class="ally"]/following-sibling::*', ul);
    ul.insertBefore(li = mkItem(type, value), next);
    if (viewingRightCity(ul) && islandView) // only touch panel on right focus
      updateItem(type, value, null, null, append && append.cloneNode(true));
  }
  if (append && !$X('span[@title]', li)) {
    li.style.whiteSpace = "nowrap";
    li.appendChild(append);
  }
  return li;
}

function cityinfoPanel() {
  return $X('id("information")//ul[@class="cityinfo"]');
}

function node(type, className, styles, content) {
  var n = document.createElement(type||"div");
  if (className) n.className = className;
  if (styles)
    for (var prop in styles)
      n.style[prop] = styles[prop];
  if (content)
    n.innerHTML = "string" == typeof content ? content : content.toXMLString();
  return n;
}

function click(node) {
  var event = node.ownerDocument.createEvent("MouseEvents");
  event.initMouseEvent("click", true, true, node.ownerDocument.defaultView,
                       1, 0, 0, 0, 0, false, false, false, false, 0, node);
  node.dispatchEvent(event);
}

function fmtNumber(n) {
  n += "";
  for (var i = n.length - 3; i > 0; i -= 3)
    n = n.slice(0, i) +","+ n.slice(i);
  return n;
}

function number(n) {
  n = { string: 1, number: 1 }[typeof n] ? n+"" : n.textContent;
  return parseInt(n.replace(/\D+/g, "") || "0", 10);
}

function trim(str) {
  return str.replace(/^\s+|\s+$/g, "");
}

function onClick(node, fn, capture, e) {
  node.addEventListener((e||"") + "click", fn, !!capture);
}

function $(id) {
  return document.getElementById(id);
}

function $x( xpath, root ) {
  var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;
  var got = doc.evaluate( xpath, root||doc, null, 0, null ), result = [];
  switch (got.resultType) {
    case got.STRING_TYPE:
      return got.stringValue;
    case got.NUMBER_TYPE:
      return got.numberValue;
    case got.BOOLEAN_TYPE:
      return got.booleanValue;
    default:
      while (next = got.iterateNext())
        result.push( next );
      return result;
  }
}

function time(t) {
  t = t || Date.now();
  return Math.floor(t / 6e4) - 2e7; // ~minute precision is enough
}

function $X( xpath, root ) {
  var got = $x( xpath, root );
  return got instanceof Array ? got[0] : got;
}

/*
The AJAX request system so we can display the scores inline
Original Author: wphilipw
For version: 0.5.0
Last changed: 0.5.0
*/

function requestScore(name, type, id, onload) {
  var cached = id && valueCache[id], key = type.charAt();
  if (cached && cached[key] && ((time() - cached.T) < 10))
    return onload(cached[key], "yes");
  //else delete valueCache[id]; // stale -- but save for now; could be useful

  GM_xmlhttpRequest({
    method: "POST",
    url: "http://" + gameServer + "/index.php",
    data: "view=highscore&highscoreType="+ post[type] +"&searchUser="+ name,
    headers: {
      "User-agent": "Mozilla/4.0 (compatible) Greasemonkey",
      "Content-type": "application/x-www-form-urlencoded",
      "Accept": "application/atom+xml,application/xml,text/xml",
      "Referer": "http://" + gameServer + "/index.php"
    },
    onload: onload
  });
}

/*
runs on first run to set up default values
Original Author: ImmortalNights
For version: 0.5.4
Last changed: 0.6.0
*/

function displayOnOptions_fn() {
  var mybox = node("div", "", { textAlign: "left" });
  var opts = <>
<h3>Score Display Options</h3>
<table border="0" cellpadding="0" cellspacing="0">
  <tr>
    <td style="width: 43%; text-align: right;">Show Total Score:</td>
    <td style="width: 57%"><input type="checkbox" id="totalScore"/></td>
  </tr>
  <tr>
    <td style="width:43%; text-align: right">Show Military Score:</td>
    <td><input type="checkbox" id="militaryScore"/></td>
  </tr>
  <tr>
    <td style="width: 43%; text-align: right">Show Gold (lootable):</td>
    <td><input type="checkbox" id="goldScore"/></td>
  </tr>
  <tr>
    <td style="width: 43%; text-align: right">Show Icon Links:</td>
    <td><input type="checkbox" id="inlineScore"/></td>
  </tr>
  <tr>
    <td style="width: 43%; text-align: right">Show Link:</td>
    <td><input type="checkbox" id="changeScoreOptions"/></td>
  </tr>
</table></>;

  mybox.innerHTML = opts.toXMLString();
  var pwd = $('options_changePass');
  pwd.appendChild(mybox);
  var checkboxes = $x('//input[@type="checkbox" and contains(@id,"Score")]');
  for (var i = 0; i < checkboxes.length; i++) {
    var input = checkboxes[i];
    var id = input.id.replace("Score", "");
    if (id == "inline")
      input.checked = !!inlineScore;
    else if ("changeOptions" == id)
      input.checked = !!changeLink;
    else
      input.checked = !!(show[id] & whatToShow);
  }

  var inputs = $x('//input[@type="submit"]');
  for (var e = 0; e < inputs.length; e++)
    onClick(inputs[e], changeShow_fn, true);
}

/*
This function saves the options chosen above
Original Author: wphilipw
For version: 0.4.5
Last changed: 0.6.0
*/

function changeShow_fn(e) {
  GM_setValue("show", (
                (show.total * $('totalScore').checked) |
                (show.military * $('militaryScore').checked) |
                (show.gold * $('goldScore').checked)
              ) + "");
  GM_setValue("inline", $('inlineScore').checked);
  GM_setValue("link", $('changeScoreOptions').checked);
  e.target.form.submit();
}




//--------------------------------------------------------------PUNTUACIONES ALIANZA-----------------------------------------------


// JavaScript Document
// ==UserScript==
// @name           Ikariam Ally Sorter
// @autor          Oberon
// @email          damn_it@tiscali.it
// @namespace      Ikariam
// @description    A little script that sorts the Ikariam Ally Members by score
// @include        http://*.ikariam.*/*
// @exclude        http://board.ikariam.*/*
// ==/UserScript==


function getPos(row) {
	// Return the score value
	return parseInt(row.cells[4].innerHTML.replace(/,/,""));
}

function sortAlly() {
	// Sort the ally table
	var table, i, rows, min, max, newRow, newCell;
	table = document.getElementById('memberList');

	max = table.rows.length;
	for (i=0; i<max -1; i++)
    {
		// Select the minimum row score
	  min = findMin(i, table);
      newRow = table.insertRow(1);
	  if ( i % 2 == 1) {
		newRow.setAttribute('class', 'alt');
	  }
      for (c=0; c<7 /* -- */; c++)	  
        {
			// Copy the row to the top of the table
		  newCell = newRow.insertCell(c);
		  newCell.setAttribute('class', table.rows[findMin(i+2, table)].cells[c].getAttribute('class'));
		  newCell.innerHTML = table.rows[findMin(i+2, table)].cells[c].innerHTML;
		}
	  // Add position number	
	  newRow.cells[0].innerHTML=(max-i-1)+".";			
	  table.deleteRow(findMin(i+2, table));	
    }	
}

function findMin(index, sTable) {
	// Finds the minimum value for remaining rows
  var pos, currentMin;
  currentMin = index;
  for (i = index; i < sTable.rows.length; i++) {
  	if ( getPos(sTable.rows[i]) < getPos(sTable.rows[currentMin]) )
		{
			currentMin=i;
		}
  }
  
  return currentMin;
}


// ++++++++++++++++ Start +++++++++++++++++
sortAlly();
// +++++++++++++++++ End ++++++++++++++++++