// ==UserScript==
// @name               IkaResourceSortTW
// @namespace          Ikariam
// @description        在資源場，按照捐木頭的程度排序 for v0.2.8
// @version            v0.2.8.002
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
var color_good 	    = GM_getValue( 'color_good', 'green' );
var color_ok  	    = GM_getValue( 'color_ok',  'blue' );
var color_bad  	    = GM_getValue( 'color_bad',  'red' );
var bkcolor_good    = GM_getValue( 'bkcolor_good', '#c7fac6' );
var bkcolor_ok      = GM_getValue( 'bkcolor_ok',  '#c6dafa' );
var bkcolor_bad     = GM_getValue( 'bkcolor_bad',  '#fac6c6' );

var language = setLanguage();
var lang     = defineLanguage(language);

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
			ownerCell = $X( "./td[@class='ownerName']", tableRows[i-1] );
			owner    = ownerCell.textContent;
			for(var j=i-1; j>=0; j--) {
				if (rows[j].OWNER == owner)
					rows[j].WORKERS += cityWorkers;
			}
			cityWorkers = rows[i-1].WORKERS;
			primary = false;
			donation = rows[i-1].DONATION;
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
	
	var thead = $X("//div[@id='resourceUsers']//div[@class='content']/table/thead/tr/th[position()=last()-1]");
	thead.setAttribute( "colspan", 2);
		
} else if ( ikaPage == 'options' ) {
	doOptions();
}

function checkLeecher( obj ) {
	//if ( !obj.PRIMARY )
	//	return obj.ROW;
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
		//parseInt( obj.DONATION ) / ( LEECH_THRESHOLD * workplace[j].WOOD ) : 'none';
		parseInt( obj.DONATION ) / ( LEECH_THRESHOLD * workplace[j].WOOD ) : 0;
	var color;
	if ( percentage == 0 ) {
		color   = color_good;
		bkcolor = bkcolor_good;
	}
	else if ( percentage < 0.95 ) {
		color   = color_bad;
		bkcolor = bkcolor_bad;
	}
	else if ( percentage < 1.05 ) {
		color   = color_ok;
		bkcolor = bkcolor_ok;
	}
	else {
		color   = color_good;
		bkcolor = bkcolor_good;
	}
	
	var dCell = $X( "./td[@class='ownerDonation']", obj.ROW );
	dCell.style.color = color;
	var t = document.createElement("td");
	t.setAttribute("class","ownerDonation");
	t.style.color = color;
	if (obj.PRIMARY) {
		t.textContent = Math.round(percentage*100)+"%";
	}
	obj.ROW.insertBefore(t, $X( "./td[@class='actions']", obj.ROW ));

	obj.ROW.style.backgroundColor = bkcolor;
	
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
		color_good 	    = GM_getValue( 'color_good', 'green' );
		color_ok  	    = GM_getValue( 'color_ok',  'blue' );
		color_bad  	    = GM_getValue( 'color_bad',  'red' );
		bkcolor_good    = GM_getValue( 'bkcolor_good', '#c7fac6' );
		bkcolor_ok      = GM_getValue( 'bkcolor_ok',  '#c6dafa' );
		bkcolor_bad     = GM_getValue( 'bkcolor_bad',  '#fac6c6' );
		var leech_check     = GM_getValue( 'leech_check', true );
		var leech_threshold = GM_getValue( 'leech_threshold', 0.15 );
		var color_list      = ['green','blue','red','orange','yellow'];
		
		var div = document.createElement( 'div' );
		div.setAttribute( 'id', 'ika_resource_sort' );
		div.appendChild( document.createElement( 'h3' ) );
		div.firstChild.appendChild( document.createTextNode( lang["LeecherOptions"] ) );
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

		tbody.appendChild( $tr( lang["EnableLeecher"], leech ) );
		tbody.appendChild( $tr( lang["DonationPercentage"],
			$sel( [0.05, 0.1, 0.15, 0.2, 0.25], leech_threshold, 'leech_threshold', $callback ) ) );
		tbody.appendChild( $tr( lang["GoodColor"],	$sel( color_list, color_good, 'color_good', $callback ) ) );
		tbody.appendChild( $tr( lang["GoodBkColor"], $input( bkcolor_good, 'bkcolor_good', $callback ) ) );
		tbody.appendChild( $tr( lang["OKColor"], $sel( color_list, color_ok, 'color_ok', $callback ) ) );
		tbody.appendChild( $tr( lang["OKBkColor"], $input( bkcolor_ok, 'bkcolor_ok', $callback ) ) );
		tbody.appendChild( $tr( lang["BadColor"], $sel( color_list, color_bad, 'color_bad', $callback ) ) );
		tbody.appendChild( $tr( lang["BadBkColor"], $input( bkcolor_bad, 'bkcolor_bad', $callback ) ) );
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

function $tr( txt, obj ) {
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
function $input(val, id, change ) {
	var input = document.createElement('input');
	input.id = id;
	input.name = id;
	input.type = "text";
	input.value = val;
	if ( change ) {
		try {
			input.addEventListener( 'change', change, true );
		} catch (err) {
			GM_log(err);
		}
	}
    return input;
}

function setLanguage() {
	var server = /\/\/([a-z._0-9]+)\//.exec(document.URL);
	server = RegExp.$1;
	var arr = server.split("\.");
	var lang = arr[arr.length - 1];
	if (lang == "com" && arr.length == 4) {
		lang = arr[1];
	}
	if (lang == "net" && arr.length == 3) {
		lang = "tr";
	}
	return lang;
}

function defineLanguage(lang) {
    switch (lang) {
        case "tw":
        case "hk":
            language = {
				LeecherOptions     : "IkaResourceSort 設定",
				EnableLeecher      : "啟動米蟲檢查",
				DonationPercentage : "捐木百分比",
				GoodColor          : "設定 \"捐木良好\" 的顏色 (非米蟲)",
				OKColor            : "設定 \"捐木普普\" 的顏色",
				BadColor           : "設定 \"捐木極差\" 的顏色 (*米蟲*)",
				GoodBkColor        : "設定 \"捐木良好\" 的背景色 (非米蟲)",
				OKBkColor          : "設定 \"捐木普普\" 的背景色",
				BadBkColor         : "設定 \"捐木極差\" 的背景色 (*米蟲*)",
			};
            break;
        case "cn": 
            language = {
				LeecherOptions     : "IkaResourceSort 设定",
				EnableLeecher      : "启动米虫检查",
				DonationPercentage : "捐木百分比",
				GoodColor          : "设定 \"捐木良好\" 的颜色 (非米虫)",
				OKColor            : "设定 \"捐木普普\" 的颜色",
				BadColor           : "设定 \"捐木极差\" 的颜色 (*米虫*)",
				GoodBkColor        : "设定 \"捐木良好\" 的背景色 (非米虫)",
				OKBkColor          : "设定 \"捐木普普\" 的背景色",
				BadBkColor         : "设定 \"捐木极差\" 的背景色 (*米虫*)",
			}; 
            break;
        default:
            language = {
				LeecherOptions     : "IkaResourceSort options",
				EnableLeecher      : "Enable leecher checking",
				DonationPercentage : "Donation percentage",
				GoodColor          : "\"Good\" color (not leecher)",
				OKColor            : "\"Average\" color (not leecher)",
				BadColor           : "\"Bad\" color (not leecher)",
				GoodBkColor        : "\"Good\" background color (not leecher)",
				OKBkColor          : "\"Average\" background color (not leecher)",
				BadBkColor         : "\"Bad\" background color (not leecher)",
			}; 
            break;
    }
    return language;
}
