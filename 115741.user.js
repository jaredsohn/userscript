// ==UserScript==
// @name        Ikariam Resources Stock App
// @version     1.1
// @copyright   2011, Aaron Mitchell
// @license     GPLv3+ (http://www.gnu.org/copyleft/gpl.html)
// @namespace   mitchellcoding.com
// @description Displays current level of resources in each town as well as safe/at-risk resources
// @include     http://s*.ikariam.*/*
// @exclude     http://support.ikariam.*/*
// @require     http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @history 1.0 Basic version based on ikares script
// @history 1.1 Added support to remove coords from town names
// ==/UserScript==

$( document ).ready( function(){
	function log( msg ){ GM_log( msg );	}

	var host = window.location.host;
    var icons = {
        "wood": "http://" + host + "/skin/resources/icon_wood.gif",
        "marble": "http://" + host + "/skin/resources/icon_marble.gif",
        "wine": "http://" + host + "/skin/resources/icon_wine.gif",
        "crystal": "http://" + host + "/skin/resources/icon_glass.gif",
        "sulphur": "http://" + host + "/skin/resources/icon_sulfur.gif"
    }

	var hostparts = host.split( "." );
	host = hostparts[ 0 ] + "." + hostparts[ 1 ];

	var gm_reserve = "ikares_" + host + "_reserve_";
	var gm_consumption = "ikares_" + host + "_consumption_";
	var gm_timestamp = "ikares_" + host + "_timestamp_";
	var gm_production = "ikares_" + host + "_production_";
	var gm_capacity = "ikares_" + host + "_capacity_";
	var gm_safe = "ikares_" + host + "_safe_";

    // settings
	var millisPerHour = 3600000;

	// extract new info from webpage
	var curr_reserve = {
        "wine":    null,
        "wood":    null,
        "marble":  null,
        "sulphur": null,
        "crystal": null
    };
	var curr_consumption = null; // wine only
	var curr_production = {
        "wine":    null,
        "wood":    null,
        "marble":  null,
        "sulphur": null,
        "crystal": null
    };
    var curr_safe = null;
    var curr_capacity = null;

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

    function isProductionField( name )
	{
		var h1 = $( "#mainview div.buildingDescription h1" );
		if( h1 == null ) return false;
		var title = h1.text();
		if( title == null || title == "" ) return false;
		var regex = new RegExp( name, "gi" );
		return isBuilding( "tradegood" ) && regex.test( title );
	}

	function isVineyard(){ return isProductionField( "Vineyard" ); }
	function isQuarry(){ return isProductionField( "Quarry" ); }
	function isSawMill(){ return isProductionField( "Saw Mill" ); }
	function isCrystalMine(){ return isProductionField( "Crystal mine" ); }
	function isSulphurPit(){ return isProductionField( "Sulphur Pit" ); }

	var curr_city = 
		$( "#changeCityForm ul li select.citySelect option:selected" );
	var curr_id = curr_city.attr( "value" );
	var clazz = curr_city.attr( "class" ).replace( /coords/, "" );
	if( clazz == "" )
	{
		// need to get:
		//   reserve, production, consumption

		// Get current reserve of town
		curr_reserve[ "wine" ] = $( "#value_wine" ).text().replace( ",", "" );
		curr_reserve[ "wood" ] = $( "#value_wood" ).text().replace( ",", "" );
		curr_reserve[ "marble" ] = $( "#value_marble" ).text().replace( ",", "" );
		curr_reserve[ "crystal" ] = $( "#value_crystal" ).text().replace( ",", "" );
		curr_reserve[ "sulphur" ] = $( "#value_sulfur" ).text().replace( ",", "" );

		// if viewing town hall, get current production
		if( isBuilding( "townHall" ) ) // compensate for 'view' and 'oldView'
		{
			var span = 
				$( "#PopulationGraph div.specialworkers span.production" );
			var text = span.text().replace( /[^\d]/g, "" );
			var img = $( "img", span );
			if( /.*wine.*/.test( img.attr( "src" ) ) )
			{
				curr_production[ 'wine' ] = text;
			}
			if( /.*marble.*/.test( img.attr( "src" ) ) )
			{
				curr_production[ 'marble' ] = text;
			}
			if( /.*sulphur.*/.test( img.attr( "src" ) ) )
			{
				curr_production[ 'sulphur' ] = text;
			}
			if( /.*crystal.*/.test( img.attr( "src" ) ) )
			{
				curr_production[ 'crystal' ] = text;
			}

            span = $( "#PopulationGraph div.woodworkers span.production" );
			text = span.text().replace( /[^\d]/g, "" );
            curr_production[ 'wood' ] = text;
		}
		// if viewing winery, get current production
		else if( isBuilding( "winegrower" ) )
		{
			var total_production = 
				$( "#bonusBuilding div.contentBox01h div.content table tr.buildingResult td.col2Style span" ).text();
			curr_production = Math.round( parseFloat( total_production ) );
		}
		else if( isBuilding( "warehouse" ) )
		{
		    var table = $( "#mainview div.contentBox01h .content .table01" );
			curr_safe = 
				$( ".sicher .amountTable td", table ).eq( 1 ).text().replace( ",", "" );
			curr_capacity = 
				$( ".capacity .amountTable td", table ).eq( 1 ).text().replace( ",", "" );
            /*
            var reserve  = $( ".gesamt" );
            $( ".amountTable tr", reserve ).each( function()
            {
                var res = $( "td", this ).eq( 0 );
                var src = $( "img", res ).attr( "src" );
                var amt = $( "td", this ).eq( 1 ).text().replace( ",", "" );
                if( src.indexOf( "icon_wood" ) )
                    curr_reserve[ 'wood' ] = amt;
                else if( src.indexOf( "icon_wine" ) )
                    curr_reserve[ 'wine' ] = amt;
                else if( src.indexOf( "icon_marble" ) )
                    curr_reserve[ 'marble' ] = amt;
                else if( src.indexOf( "icon_glass" ) )
                    curr_reserve[ 'crystal' ] = amt;
                else if( src.indexOf( "icon_sulfur" ) )
                    curr_reserve[ 'sulphur' ] = amt;
            }
            */
		}
		else if( isSawMill() )
		{
			curr_production[ 'wood' ] = $( "#valueResource" ).text();
		}
		else if( isQuarry() )
		{
			curr_production[ 'marble' ] = $( "#valueResource" ).text();
		}
		else if( isVineyard() )
		{
			curr_production[ 'wine' ] = $( "#valueResource" ).text();
		}
		else if( isCrystalMine() )
		{
			curr_production[ 'crystal' ] = $( "#valueResource" ).text();
		}
		else if( isSulphurPit() )
		{
			curr_production[ 'sulphur' ] = $( "#valueResource" ).text();
		}

		// if viewing tavern, get current consumption
		var bonus_mapping = new Array();
		bonus_mapping[ "0" ]   = 0;
		bonus_mapping[ "60" ]  = 4;
		bonus_mapping[ "120" ] = 8;
		bonus_mapping[ "180" ] = 13;
		bonus_mapping[ "240" ] = 18;
		bonus_mapping[ "300" ] = 24;
		bonus_mapping[ "360" ] = 30;
		bonus_mapping[ "420" ] = 37;
		bonus_mapping[ "480" ] = 44;
		bonus_mapping[ "540" ] = 51;
		bonus_mapping[ "600" ] = 60;
		bonus_mapping[ "660" ] = 68;
		bonus_mapping[ "720" ] = 78;
		bonus_mapping[ "780" ] = 88;
		bonus_mapping[ "840" ] = 99;
		bonus_mapping[ "900" ] = 110;
		bonus_mapping[ "960" ] = 122;
		bonus_mapping[ "1020" ] = 136;
		bonus_mapping[ "1080" ] = 150;
		bonus_mapping[ "1140" ] = 165;
		bonus_mapping[ "1200" ] = 180;
		bonus_mapping[ "1260" ] = 197;
		bonus_mapping[ "1320" ] = 216;
		bonus_mapping[ "1380" ] = 235;
		bonus_mapping[ "1440" ] = 255; // level 25
		// the following may be incorrect
		bonus_mapping[ "1500" ] = 277;
		bonus_mapping[ "1560" ] = 300;
		bonus_mapping[ "1620" ] = 325;
		bonus_mapping[ "1680" ] = 351;
		bonus_mapping[ "1740" ] = 378;
		bonus_mapping[ "1800" ] = 408;
		bonus_mapping[ "1860" ] = 439;
		bonus_mapping[ "1920" ] = 472;
		bonus_mapping[ "1980" ] = 507;
		bonus_mapping[ "2040" ] = 544;
		bonus_mapping[ "2100" ] = 584;
		bonus_mapping[ "2160" ] = 626;
		bonus_mapping[ "2220" ] = 670;
		bonus_mapping[ "2280" ] = 717;
		bonus_mapping[ "2340" ] = 766;
		bonus_mapping[ "2400" ] = 818;
		bonus_mapping[ "2460" ] = 874;
		bonus_mapping[ "2520" ] = 933;
		bonus_mapping[ "2580" ] = 995;
		bonus_mapping[ "2620" ] = 1060;
		bonus_mapping[ "2700" ] = 1129;
		bonus_mapping[ "2760" ] = 1202;
		bonus_mapping[ "2820" ] = 1278; // level 47

		if( isBuilding( "tavern" ) )
		{
			// satisfaction
			var curr_wineserving = $( "#bonus" ).text();
			// save saved by press each hour
			var saved = 0;
			var saved_el = $( "#savedWine" );
			if( jQuery.trim( saved_el.text() ) != "" )
			{
				saved = parseFloat( saved_el.text() );
			}
			curr_consumption = Math.round( bonus_mapping[ curr_wineserving ] - saved );
		}

        var gm_t = gm_timestamp + curr_id;
        var ts = new Date().getTime();
        GM_setValue( gm_t, "" + ts );
        for( var r in curr_reserve )
        {
		    // Save curr_* variables
		    if( curr_reserve[ r ]  != null && !isNaN( curr_reserve[ r ] ) )
		    {
                var gm_r = gm_reserve + r + "_" + curr_id;
                GM_setValue( gm_r, "" + curr_reserve[ r ] );
            }
            if( curr_production[ r ] != null && !isNaN( curr_production[ r ] ) )
            {
                var gm_p = gm_production + r + "_" + curr_id;
                GM_setValue( gm_p, "" + curr_production[ r ] );
            }
        }
        if( curr_consumption != null && !isNaN( curr_consumption ) )
        {
            var gm_c = gm_consumption + curr_id;
            GM_setValue( gm_c, "" + curr_consumption );
        }
        if( curr_capacity != null && !isNaN( curr_capacity ) )
        {
            var gm_k = gm_capacity + curr_id;
            GM_setValue( gm_k, "" + curr_capacity );
        }
        if( curr_safe != null && !isNaN( curr_safe ) )
        {
            var gm_k = gm_safe + curr_id;
            GM_setValue( gm_k, "" + curr_safe );
        }
	}



    function addCommas(nStr)
    {
        nStr += '';
        x = nStr.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
    }


	function abbrev(nStr)
	{
        if( nStr >= 1000000 )
            return Math.floor(nStr / 1000000) + "M";
        if( nStr >= 1000 )
            return Math.floor(nStr / 1000) + "k";
        return nStr;
	}

	function formatTimeLeft( hours )
	{
		var days = 0;
		if( hours > 24 )
		{
			days = Math.floor( hours / 24 );
			hours -= (days * 24);
		}
		var ret = "";
		if( days > 0 )
			ret += days + "D ";
        hours = Math.floor( hours );
		ret += hours + "H";
		return ret;
	}

    function roundto( value, decimal )
    {
        if( decimal < 10 ) return Math.round( value );
        return Math.round( value * decimal ) / decimal;
    }











	// display current (guestimated) stock
	function get_current_stock( timestamp, amt, prod, con )
	{
		// A tick is one time step in which wine is deducted from a 
		//   towns reserve
		var conticksperhour = 1; // should be 3, but is 1 by observation
		var prodticksperhour = 60;

		// Since wine is consumed at regular intervals, but wine
		// is produced continuously, we need to different 
		// time references.
		// For consumption, roll back the timestamp to the start of the hour.
		// Add one second so we don't trigger too many tick updates.

		// roll ts back to start of hour
		var ts_hour = Math.floor( timestamp / millisPerHour ) * millisPerHour + 1000;

		// wine consumed per tick
		var consumption_per_tick = con / conticksperhour;
		// current time in milliseconds since epoch
		var curTime = new Date().getTime();
		var timediffms = curTime - ts_hour;
		var timediffhours = timediffms / millisPerHour;

		// ticks since last update
		var con_ticks = timediffhours * conticksperhour;
		con_ticks = Math.floor( con_ticks );
		// total wine consumed since last update
		var consumed = consumption_per_tick * con_ticks;

		// add in production
		var prod_per_tick = prod / prodticksperhour;
		// production need to use the non-modified timestamp
		timediffms = curTime - timestamp;
		timediffhours = timediffms / millisPerHour;
		var prod_ticks = timediffhours * prodticksperhour;
		prod_ticks = Math.floor( prod_ticks );
		var produced = prod_per_tick * prod_ticks;

		// current stock
		return Math.round( amt - consumed + produced );
	}

	function calc_current_stock( town )
	{
		for( r in town.reserve )
        {
		    if( town.timestamp == 0 )
			    town.reserve[ r ] = "???";
            else
                town.reserve[ r ] = get_current_stock( town.timestamp, town.reserve[ r ], town.production[ r ], r == "wine"? town.consumption: 0 );
        }
	}



	var towns = new Array();
	$( "#citySelect option" ).each( function(){
		if( $(this).attr( "class" ).replace( /coords/, "" ) == "" )
		{
			var town = $(this).text().replace( /\[\d+:\d+\] ?/g, "" );
			var id = $(this).attr( "value" );
			var title = $(this).attr( "title" );
			var t = {};
			t.label = town;
			t.name = town.replace( /\[\d+:\d+\]\s+/, "" );
			t.id = id;
			t.luxury = title.replace( "Trade good: ", "" );
			t.reserve = {
                "wood":    0,
                "wine":    0,
                "marble":  0,
                "sulphur": 0,
                "crystal": 0
            };
			t.consumption = 0; // wine only
			t.production = {
                "wood":    0,
                "wine":    0,
                "marble":  0,
                "sulphur": 0,
                "crystal": 0
            };
			t.timestamp = 0;
            t.capacity = 0;
            t.safe = 0;
			towns.push( t );
		}
	});

	// populate objects with stored values and update stock
	for( var i = 0; i < towns.length; i++ )
	{
		var t = towns[ i ];
        for( var r in t.reserve )
        {
		    var gm_r = gm_reserve + r + "_" + t.id;
		    t.reserve[ r ] = parseInt( GM_getValue( gm_r, 0 ) );
		    var gm_p = gm_production + r + "_" + t.id;
		    t.production[ r ] = parseInt( GM_getValue( gm_p, 0 ) );
            if( isNaN( t.reserve[ r ] ) )
                t.reserve[ r ] = 0;
            if( isNaN( t.production[ r ] ) )
                t.production[ r ] = 0;
            if( isNaN( t.consumption[ r ] ) )
                t.consumption[ r ] = 0;
        }
        var gm_c = gm_consumption + t.id;
        t.consumption = parseInt( GM_getValue( gm_c, 0 ) );
		var gm_t = gm_timestamp + t.id;
		t.timestamp = parseInt( GM_getValue( gm_t, 0 ) );
        var gm_cp = gm_capacity + t.id;
        t.capacity = parseInt( GM_getValue( gm_cp, 0 ) );
        var gm_s = gm_safe + t.id;
        t.safe = parseInt( GM_getValue( gm_s, 0 ) );

        if( isNaN( t.timestamp ) )
            t.timestamp = 0;

		calc_current_stock( t )
	}



    var displayOrder = [ 'wood', 'wine', 'marble', 'crystal', 'sulphur' ];

    var clazz = "";
	var div  = "<div id='ikares_div' class='dynamic' style='z-index: 1;'>";

    var title = "Visit Town Hall, Tavern, and Warehouse in each town to populate values";
	div += "<h3 class='header' title='" + title + "'>Resources</h3>";
	div += "<div class='content'>";
	div += "<table width='100%'>";
    div += "  <tr>";
    div += "    <td></td>";
    for( var i = 0; i < displayOrder.length; i++ )
    {
        div += "    <td><img src='" + icons[ displayOrder[ i ] ] + "'/></td>";
    }
    div += "  </tr>";
	for( var i = 0; i < towns.length; i++ )
	{
		var t = towns[ i ];
        clazz = "";
        title = "Cap: " + addCommas( t.capacity ) + "; Safe: " + addCommas( t.safe );
		div += "<tr>";
		div += "  <td id='ikares_town_" + t.id + "' class='ikares_town" + clazz + "' title='" + title + "'>";
		div += t.label;
		div += "  </td>";

        for( var j = 0; j < displayOrder.length; j++ )
        {
		    clazz = "ikares_val";
            var r = displayOrder[ j ];
            var risk = t.reserve[ r ] - t.safe;
            if( risk < 0 ) risk = 0;
            if( risk > 0 )
                clazz = "ikares_val ikares_warning";
            title = addCommas( t.reserve[ r ] ) + "; Lootable: " + addCommas( risk ) + "; Prod: " + addCommas( t.production[ r ] );
            if( r == "wine" )
                title += "; Cons: " + t.consumption;
		    div += "  <td class='" + clazz + "' title='" + title + "'><center>" + abbrev( t.reserve[ r ] ) + "</center></td>";
        }
		div += "</tr>";
	}
	div += "</table>";
	div += "</div>"; // end content
	div += "<div class='footer'></div>";
	div += "</div>";
    $( div ).insertAfter( "#container2 div.dynamic:first" );

	GM_addStyle( "#ikares_div td{ margin: 0px 5px 0px 5px; }" );
	GM_addStyle( "#ikares_div td.ikares_town{ font-weight: bold; }" );
	GM_addStyle( "#ikares_div td.ikares_town:hover{ cursor:pointer; text-decoration:underline; }" );
	GM_addStyle( ".ikares_val{ text-align:right; padding: 0px 0px 0px 5px; }");
	GM_addStyle( ".ikares_warning{ color:red; font-weight:bold; }" );

	var url = 'http://' + window.location.host + '/index.php?';
	$( ".ikares_town" ).each( function(){
		$(this).bind( 'click', function(){
			$( '#changeCityForm fieldset input' ).each( function(){
				url += $(this).attr('name') + '=' + $(this).attr('value') + '&';
			});
			var tid = $(this).attr( "id" ).replace( /ikares_town_/, "" );
			url += 'cityId=' + tid;
			//url += "view=city&id=" + tid;
			unsafeWindow.location.href = url;
		});
	});

	$( "#ikares_div tr" ).each( function(){
		$(this).hover( 
		function(){
			$(this).css( 'background-color', '#EDDF82' );
		},
		function(){
			$(this).css( 'background-color', '' );
		}
		);
	});
});

