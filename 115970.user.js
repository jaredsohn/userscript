// ==UserScript==
// @name        Ikariam City Defense
// @version     1.0
// @copyright   2011, Aaron Mitchell
// @license     GPLv3+ (http://www.gnu.org/copyleft/gpl.html)
// @namespace   mitchellcoding.com
// @description Removes configured units from Barracks, Send Troops views
// @include     http://s*.ikariam.*/index.php?view=barracks*
// @include     http://s*.ikariam.*/index.php?view=shipyard*
// @include     http://s*.ikariam.*/index.php?view=options&page=game*
// @include     http://s*.ikariam.*/index.php?view=deployment*
// @exclude     http://support.ikariam.*/*
// @require     http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @history 1.0 Basic version with minor updates
// ==/UserScript==

$( document ).ready( function(){
	function log( msg ){ GM_log( msg );	}

	var host = window.location.host;
	var hostparts = host.split( "." );
	host = hostparts[ 0 ] + "." + hostparts[ 1 ];
	var gm_army  = "ikawine_" + host + "_army_";
	var gm_fleet = "ikawine_" + host + "_fleet_";


    var iconpath = "http://" + host + ".ikariam.com/skin/characters/military/x60_y60/";
    var ficonpath = "http://" + host + ".ikariam.com/skin/characters/fleet/60x60/";
    var icons = {
        'hoplite':    iconpath + "y60_phalanx_faceright.gif",
        'sg':         iconpath + "y60_steamgiant_faceright.gif",
        'spearmen':   iconpath + "y60_spearman_faceright.gif",
        'archer':     iconpath + "y60_archer_faceright.gif",
        'swordsman':  iconpath + "y60_swordsman_faceright.gif",
        'slinger':    iconpath + "y60_slinger_faceright.gif",
        'sc':         iconpath + "y60_marksman_faceright.gif",
        'ram':        iconpath + "y60_ram_faceright.gif",
        'catapult':   iconpath + "y60_catapult_faceright.gif",
        'mortar':     iconpath + "y60_mortar_faceright.gif",
        'gyro':       iconpath + "y60_gyrocopter_faceright.gif",
        'balloon':    iconpath + "y60_bombardier_faceright.gif",
        'cook':       iconpath + "y60_cook_faceright.gif",
        'doctor':     iconpath + "y60_medic_faceright.gif"
        'ramship':   ficonpath + "ship_ram_faceright.gif",
        'fire':      ficonpath + "ship_flamethrower_faceright.gif",
        'pwr':       ficonpath + "ship_steamboat_faceright.gif",
        'ballista':  ficonpath + "ship_ballista_faceright.gif",
        'catship':   ficonpath + "ship_catapult_faceright.gif",
        'mortarship':ficonpath + "ship_mortar_faceright.gif",
        'dive':      ficonpath + "ship_submarine_faceright.gif"
    };

	// extract new info from webpage

	function isPage( match )
	{
		var href = window.location.search.substring(1);
		return href.indexOf( match ) >= 0;
	}

	function isBuilding( match )
	{
        // ensure the town viewed on page is town selected
        var displayedTown = $( "#breadcrumbs span.city" ).text();
        var selectedTown = $( "#changeCityForm div.dropbutton" ).text();
        if( selectedTown.indexOf( displayedTown ) >= 0 )
        {
            var body = $( "body" );
            return body.attr( "id" ) == match;
        }
	}

    var army  = GM_getValue( gm_army, '' );
    if( army === undefined || army == '' )
        army = {
            'hoplite': 0,
            'sg': 0,
            'spearmen': 0,
            'archer': 0,
            'swordsman': 0,
            'slinger': 0,
            'sc': 0,
            'ram': 0,
            'catapult': 0,
            'mortar': 0,
            'gyro': 0,
            'balloon': 0,
            'cook': 0,
            'doctor': 0,
        };
    else
        army = eval( army );
    var fleet = GM_getValue( gm_fleet, '' );
    if( fleet === undefined || fleet == '' )
        fleet = {
            'ramship': 0,
            'fire': 0,
            'pwr': 0,
            'ballista': 0,
            'catship': 0,
            'mortarship': 0,
            'dive': 0
        };
    else
        fleet = eval( fleet );





	// is this the game options page?
	if( isPage( "view=options" ) && isPage( "page=game" ) )
	{
		var div = "";
		div += "<div class='contentBox01h'>";
		div += "  <h3 class='header'>City Defense</h3>";
		div += "  <div class='content'>";
		div += "    <div>";
		div += "      <table cellspacing='0' cellpadding='0'>";
        var title = "These troops/ships will not be available for transport or dismissal.";
        for( var troop in army )
        {
		    div += "        <tr>";
		    div += "          <th title='" + troop + "'><img src='" + icon[troop] + "'/></th>";
		    div += "          <td><input id='citydef_" + troop + "' type='text' title='" + title + "' style='width: 50px;' value='" + army[troop] + "'/></td>";
		    div += "        </tr>";
        }
        for( var ship in fleet )
        {
		    div += "        <tr>";
		    div += "          <th title='" + ship + "'><img src='" + icon[ship] + "'/></th>";
		    div += "          <td><input id='citydef_" + ship + "' type='text' title='" + title + "' style='width: 50px;' value='" + fleet[ship] + "'/></td>";
		    div += "        </tr>";
        }
		div += "        <tr>";
		div += "          <td colspan='2'><center><input id='citydef_save' type='button' class='button' value='Save Defense'/></center></td>";
		div += "        </tr>";
		div += "      </table>";
		div += "      <div id='citydef_settings_display'></div>";
		div += "    </div>";
		div += "  </div>";
		div += "  <div class='footer'></div>";
		div += "</div>";
		$( div ).insertBefore( "#vacationMode" );
		$( "#citydef_save" ).click( function(){
            var army = {
                'hoplite': 0,
                'sg': 0,
                'spearmen': 0,
                'archer': 0,
                'swordsman': 0,
                'slinger': 0,
                'sc': 0,
                'ram': 0,
                'catapult': 0,
                'mortar': 0,
                'gyro': 0,
                'balloon': 0,
                'cook': 0,
                'doctor': 0,
            };
            for( var troop in army )
            {
                army[ troop ] = $("#citydef_"+troop).attr( "value" );
            }
            var fleet = {
                'ramship': 0,
                'fire': 0,
                'pwr': 0,
                'ballista': 0,
                'catship': 0,
                'mortarship': 0,
                'dive': 0
            };
            for( var ship in fleet )
            {
                fleet[ ship ] = $("#citydef_"+ship).attr( "value" );
            }

			GM_setValue( gm_army,  uneval( army ) );
			GM_setValue( gm_fleet, uneval( fleet ) );

			$( "#citydef_settings_display" ).html( "<center>Defense Saved</center>" );
		});
	}

    function adjust_count( name, defcnt )
    {
        var unitcount = $( "#units ." + name + " .unitcount" );
        var cnt = unitcount.text().replace( "Available: ", "" );
        var ncnt = cnt - defcnt;
        unitcount.innerHTML = "<span class='textLabel'>Available: </span>" + ncnt;
    }

    if( isPage( "view=barracks" ) )
    {
        adjust_count( "phalanx", army[ 'hoplite' ] );
        adjust_count( "steamgiant", army[ 'sg' ] );
        adjust_count( "spearman", army[ 'spearman' ] );
        adjust_count( "swordsman", army[ 'swordsman' ] );
        adjust_count( "slinger", army[ 'slinger' ] );
        adjust_count( "archer", army[ 'archer' ] );
        adjust_count( "marksman", army[ 'sc' ] );
        adjust_count( "ram", army[ 'ram' ] );
        adjust_count( "catapult", army[ 'catapult' ] );
        adjust_count( "mortar", army[ 'mortar' ] );
        adjust_count( "gyrocopter", army[ 'gyro' ] );
        adjust_count( "bombardier", army[ 'balloon' ] );
        adjust_count( "cook", army[ 'cook' ] );
        adjust_count( "medic", army[ 'doctor' ] );
    }

    if( isPage( "view=shipyard" ) )
    {
        adjust_count( "ship_ram", fleet[ 'ramship' ] );
        adjust_count( "ship_flamethrower", fleet[ 'fire' ] );
        adjust_count( "ship_steamboat", fleet[ 'pwr' ] );
        adjust_count( "ship_ballista", fleet[ 'ballista' ] );
        adjust_count( "ship_catapult", fleet[ 'catship' ] );
        adjust_count( "ship_mortar", fleet[ 'mortarship' ] );
        adjust_count( "ship_submarine", fleet[ 'dive' ] );
    }
});

