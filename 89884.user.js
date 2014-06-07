// ==UserScript==
// @name        Ikariam Wine Stock App
// @version     4.0
// @copyright   2010, Aaron Mitchell
// @license     GPLv3+ (http://www.gnu.org/copyleft/gpl.html)
// @namespace   mitchellcoding.com
// @description Displays current level of wine in each town
// @include     http://s*.ikariam.*/*
// @exclude     http://support.ikariam.*/*
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_addStyle
// @grant       GM_log
// @require     http://code.jquery.com/jquery-2.0.3.min.js
// @history 4.0 Updated to work with Ikariam 0.5.9 (looks a bit different, but the functionality is there)
// @history 3.3 Town name will not show high consumption warning if there is no wine consumption in that town.
// @history 3.2 Changed main tooltip to show net production.
// @history 3.1 Added low production warning and improved tooltips.  Separated winebase and wineserving stored variables so changing wine consumption is auto-updated within tavern.
// @history 3.0 Added Happiness/Growth rates and high consumption warning
// @history 2.0 Basic version with minor updates
// ==/UserScript==

// TODO Add caching
//   Cache values along with "calculated" timestamp.  If current time less
//   than, say 10min, display cached values, otherwise, update values

// TODO track shipments (amount and ETA) and update values when they should
//   have arrived

// Display the current wine stock in each town in the side panel
// User must visit each tavern in each town before stock can be displayed.
// Track:
//   Current wine reserve in town
//   Wine consumption in tavern
//   Timestamp when updating info
//   Wine production (including bonus for wine-producing towns)
// On every page refresh, update wine stock in each town based on wine
//   reserve, consumption, and timestamp when the last recorded
// Turn text bold and red when wine gets below some user-defined threshold

// Player towns:
// $( "#changeCityForm ul li div.citySelect ul li.coords" );

// @3.0 Add in satisfaction/happiness/growth into the table
// happiness = Basic_Bonuses (196 + Research) + Wine (Tavern Base + wine bonus) + culture (museum base + CT bonus) - population - corruption (corr_rate * happiness produced)
// OR
// H = TotalHappiness - (population + corruption * TotalHappiness);
// OR
// H = (1 - Corruption) * TotalHappinessProduced - Population;

// Corruption = (1 - (GR + 1) / (C + 1)) * 100
//  where GR is Gov.Res.Level and C is # of colonies (excluding capital)

// Growth = Happiness * 0.02;
// Growth at time t:
//   p(t) = p0 + h(1-e^(t/50))
//   where
//     p0 is the starting population
//     p(t) is the population after t hours
//     h is initial happiness
//     e is Euler's constant

// Hours before town hall gets filled:
//  50 ln( h / b-c )
//   where
//   ln is natural log
//   h is initial happiness
//   b is total positive satisfaction bonus
//   c is capacity of Town hall
//  if town capacity is bigger than bonus, TH will never fill, and formula
//    with result in error.

// If no changes in happiness, it halves every 34h39m26s while pop grows
// at same rate as happiness diminishes.

// There are 5 happiness levels:
// Level        Growth Rate       Icon
// Euphoric       6 and greater    http://s9.en.ikariam.com/skin/smilies/ecstatic.gif
// Happy          1.00 to 5.99     http://s9.en.ikariam.com/skin/smilies/happy.gif
// Neutral        0 to 0.99        http://s9.en.ikariam.com/skin/smilies/neutral.gif
// Unhappy        -0.01 to -1      http://s9.en.ikariam.com/skin/smilies/sad.gif
// Angry          -1.01 and lower  http://s9.en.ikariam.com/skin/smilies/outraged.gif


$( document ).ready( function(){
    console.log( "ready" );
    var log_messages = "";
    
    function log( msg )
    {
        //GM_log( msg );
        //console.log( msg );
        log_messages += msg + "\n";
    }
    
    function displayLog()
    {
        alert( log_messages );
    }
    
    function clear_log()
    {
        log_messages = "";
    }
    
    String.prototype.endsWith = function( pattern ) 
    {
        var d = this.length - pattern.length;
        return d >= 0 && this.lastIndexOf(pattern) === d;
    };
    
    String.prototype.startsWith = function( pattern ) 
    {
        return this.indexOf( pattern ) == 0;
    };
    
    // happiness icons
    var euphoric_href = "http://s20-us.ikariam.gameforge.com/skin/smilies/ecstatic.png";
    var happy_href = "http://s20-us.ikariam.gameforge.com/skin/smilies/happy.png";
    var neutral_href = "http://s20-us.ikariam.gameforge.com/skin/smilies/neutral.png";
    var unhappy_href = "http://s20-us.ikariam.gameforge.com/skin/smilies/sad.png";
    var angry_href = "http://s20-us.ikariam.gameforge.com/skin/smilies/outraged.png";
    
    var host = window.location.host;
    var hostparts = host.split( "." );
    host = hostparts[ 0 ] + "." + hostparts[ 1 ];
    var gm_reserve = "ikawine_" + host + "_reserve_";
    var gm_consumption = "ikawine_" + host + "_consumption_";
    var gm_timestamp = "ikawine_" + host + "_timestamp_";
    var gm_production = "ikawine_" + host + "_production_";
    var gm_threshold = "ikawine_" + host + "_threshold";
    // happiness variables
    var gm_basicbonus = "ikawine_" + host + "_basicbonus_";
    var gm_winebase = "ikawine_" + host + "_winebase_";
    var gm_wineserving = "ikawine_" + host + "_wineserving_";
    var gm_ctbonus = "ikawine_" + host + "_ctbonus_";
    var gm_population = "ikawine_" + host + "_population_";
    var gm_housingspace = "ikawine_" + host + "_housingspace_";
    var gm_grlevel = "ikawine_" + host + "_grlevel_";
    var gm_low_prod_warning = "ikawine_" + host + "_lowprodwarn";
    var gm_corruption = "ikawine_" + host + "_corruption";
    
    // settings
    var millisPerHour = 3600000;
    var lowStockThresholdHours = GM_getValue( gm_threshold );
    if( lowStockThresholdHours == null || lowStockThresholdHours == "" )
    {
        lowStockThresholdHours = 36;
        GM_setValue( gm_threshold, lowStockThresholdHours );
    }
    var lowprodwarning = GM_getValue( gm_low_prod_warning );
    if( lowprodwarning != '0' && lowprodwarning != '1' )
    {
        GM_setValue( gm_low_prod_warning, "1" );
    }
    
    // extract new info from webpage
    
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
    
    
    
    function isPage( match )
    {
        //var regex = new RegExp( match, "gi" );
        //return regex.test( window.location.href );
        var href = window.location.search.substring(1);
        return href.indexOf( match ) >= 0;
    }
    
    function isBuilding( match )
    {
        // ensure the town viewed on page is town selected
        var displayedTown = $( "#js_cityBread" ).text();
        var selectedTown = $( "#js_citySelectContainer span.dropDownButton" ).text();
        if( selectedTown.indexOf( displayedTown ) >= 0 )
        {
            var body = $( "body" );
            return body.attr( "id" ) == match;
        }
        return false;
    }
    
    function isVineyard()
    {
        var h1 = $( "#mainview div.buildingDescription h1" );
        if( h1 == null ) return false;
        var title = h1.text();
        if( title == null || title == "" ) return false;
        var regex = new RegExp( "Vineyard", "gi" );
        return isBuilding( "tradegood" ) && regex.test( title );
    }
    
    $.fn.classes = function (callback) {
        var classes = [];
        $.each(this, function (i, v) {
            var splitClassName = v.className.split(/\s+/);
            for (var j in splitClassName) {
                var className = splitClassName[j];
                if (-1 === classes.indexOf(className)) {
                    classes.push(className);
                }
            }
        });
        if ('function' === typeof callback) {
            for (var i in classes) {
                callback(classes[i]);
            }
        }
        return classes;
    };
    
    
    function ikawine_update()
    {
        clear_log();
        
        var curr_reserve = null;
        var curr_consumption = null;
        var curr_production = null;
        var curr_population = null;
        var curr_housingspace = null;
        var curr_basicbonus = null;
        var curr_winebase = null;
        var curr_wineserving = null;
        var curr_ctbonus = null;
        var curr_grlevel = null;
        var curr_corruption = null;
        
        var curr_city = $( "#js_citySelectContainer" );
        
        var curr_city_name = curr_city.text();
        
        var curr_city_id = 0;
        $( "#dropDown_js_citySelectContainer li.ownCity" ).each( function(){
            if( $( this ).text() == curr_city_name )
            {
                curr_city_id = $( this ).attr( "selectvalue" );
            }
        });
        
        log( "Current City: " + curr_city_name + " (" + curr_city_id + ")" );
        
        // Test if we're currently looking at the current city
        var breadcrumb_city_name = $( "#js_cityBread" ).text();
        if( curr_city_name.endsWith( breadcrumb_city_name ) )
        {
            // Get current reserve in town
            curr_reserve    = $( "#js_GlobalMenu_wine" ).text().replace( ",", "" );
            // Get current population of town
            curr_population = $( "#js_GlobalMenu_population" ).text().replace( ",", "" );
            
            // Get Palace/GR level
            $( "#locations div.building" ).each( function(){
                var me = $( this );
                if( me.hasClass( "palace" ) || me.hasClass( "palaceColony" ) )
                {
                    var classList = me.attr( 'class' ).split( /\s+/ );
                    $.each( classList, function( index, item ){
                        if( item.startsWith( 'level' ) ) 
                        {
                            curr_grlevel = item.replace( "level", "" );
                        }
                    });
                }
            });
            
            
            // Get production
            var townHall = $( "#townHall" );
            if( townHall.length > 0 )
            {
                if( $( "#js_TownHallPopulationGraphSpecialWorkers div.production div.resourceIcon" ).hasClass( "icon_wine" ) )
                    curr_production = $( "#js_TownHallPopulationGraphTradeGoodProduction" ).text().replace( "+", "" );
                else
                    curr_production = 0;
                // Get amount of unoccupied housing space in town
                curr_housingspace = $( "#js_TownHallMaxInhabitants" ).text().replace( ",", "" );
                
                // Get satisfaction bonuses
                // get basic bonuses
                var basebonus = parseInt( $( "#js_TownHallSatisfactionOverviewBaseBoniBaseBonusValue" ).text().replace( "+", "" ) );
                var researchbonus = parseInt( $( "#js_TownHallSatisfactionOverviewBaseBoniResearchBonus" ).text().replace( "+", "" ) );
                var govtbonus = parseInt( $( "#js_TownHallSatisfactionOverviewBaseBoniGovernmentBonusValue" ).text().replace( "+", "" ) );
                curr_basicbonus = basebonus + researchbonus + govtbonus;
                var capitalbonus = $( "#js_TownHallSatisfactionOverviewBaseBoniCapitalBonus" );
                var capitalbonusval = $( "#js_TownHallSatisfactionOverviewBaseBoniCapitalBonusValue" );
                if( capitalbonus.length > 0 && !capitalbonus.hasClass( "invisible" ) )
                    capitalbonusval = parseInt( capitalbonusval.text().replace( "+", "" ) );
                else
                    capitalbonusval = 0;
                curr_basicbonus += capitalbonusval;
                
                // get wine bonuses
                curr_winebase    = parseInt( $( "#js_TownHallSatisfactionOverviewWineBoniTavernBonusValue" ).text().replace( "+", "" ) );
                curr_wineserving = parseInt( $( "#js_TownHallSatisfactionOverviewWineBoniServeBonusValue" ).text().replace( "+", "" ) );
                
                // get CT bonuses
                curr_ctbonus  = parseInt( $( "#js_TownHallSatisfactionOverviewCultureBoniMuseumBonusValue" ).text().replace( "+", "" ) );
                curr_ctbonus += parseInt( $( "#js_TownHallSatisfactionOverviewCultureBoniTreatyBonusValue" ).text().replace( "+", "" ) );
                
                // get corruption
                curr_corruption = parseInt( $( "#js_TownHallSatisfactionOverviewCorruptionMalusValue" ).text() );
            }
            
            var winegrower = $( "#winegrower" );
            if( winegrower.length > 0 )
            {
                var total_production = $( "#bonusBuilding div.contentBox01h div.content table tr.buildingResult span[title='Total']" ).text();
                curr_production = Math.round( parseFloat( total_production ) );
            }
            
            var vineyard = $( "#js_mainBoxHeaderTitle" );
            if( vineyard.length > 0 && vineyard.text() == "Vineyard" )
            {
                curr_production = Math.round( parseFloat( $( "#valueResource" ).text().replace( "+", "" ) ) );
            }
            
            var tavern = $( "#tavern" );
            if( tavern.length > 0 )
            {
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
                
                var consumption = $( "#js_wineAmountContainer span.dropDownButton" ).text().replace( " Wine per hour", "" ).trim();
                if( consumption == "No wine" )
                    curr_consumption = 0;
                else
                	curr_consumption = parseInt( consumption );
                
                /* TODO update later
                // satisfaction
				curr_wineserving = $( "#bonus" ).text();
				// save saved by press each hour
				var saved = 0;
				var saved_el = $( "#savedWine" );
				if( jQuery.trim( saved_el.text() ) != "" )
				{
					saved = parseFloat( saved_el.text() );
				}
				curr_consumption = Math.round( bonus_mapping[ curr_wineserving ] - saved );
            	*/
            }
            
            // Save curr_* variables
            if( curr_reserve != null && !isNaN( curr_reserve ) )
            {
                var gm_t = gm_timestamp + curr_city_id;
                var ts = new Date().getTime();
                GM_setValue( gm_t, "" + ts );
                var gm_r = gm_reserve + curr_city_id;
                GM_setValue( gm_r, "" + curr_reserve );
            }
            if( curr_consumption != null && !isNaN( curr_consumption ) )
            {
                var gm_c = gm_consumption + curr_city_id;
                GM_setValue( gm_c, "" + curr_consumption );
            }
            if( curr_production != null && !isNaN( curr_production ) )
            {
                var gm_p = gm_production + curr_city_id;
                GM_setValue( gm_p, "" + curr_production );
            }
            if( curr_population != null && !isNaN( curr_population ) )
            {
                var gm_p = gm_population + curr_city_id;
                GM_setValue( gm_p, "" + curr_population );
            }
            if( curr_housingspace != null && !isNaN( curr_housingspace ) )
            {
                var gm_h = gm_housingspace + curr_city_id;
                GM_setValue( gm_h, "" + curr_housingspace );
            }
            if( curr_basicbonus != null && !isNaN( curr_basicbonus ) )
            {
                var gm_k = gm_basicbonus + curr_city_id;
                GM_setValue( gm_k, "" + curr_basicbonus );
            }
            if( curr_winebase != null && !isNaN( curr_winebase ) )
            {
                var gm_k = gm_winebase + curr_city_id;
                GM_setValue( gm_k, "" + curr_winebase );
            }
            if( curr_wineserving != null && !isNaN( curr_wineserving ) )
            {
                var gm_k = gm_wineserving + curr_city_id;
                GM_setValue( gm_k, "" + curr_wineserving );
            }
            if( curr_ctbonus != null && !isNaN( curr_ctbonus ) )
            {
                var gm_k = gm_ctbonus + curr_city_id;
                GM_setValue( gm_k, "" + curr_ctbonus );
            }
            if( curr_grlevel != null && !isNaN( curr_grlevel ) )
            {
                var gm_k = gm_grlevel + curr_city_id;
                GM_setValue( gm_k, "" + curr_grlevel );
            }
            if( curr_corruption != null && !isNaN( curr_corruption ) )
            {
                var gm_k = gm_corruption + curr_city_id;
                GM_setValue( gm_k, "" + curr_corruption );
            }
        } /* End get info from current city */
        
        
        // display current (guestimated) stock
        function calc_current_stock( town )
        {
            if( town.timestamp == 0 )
            {
                town.stock = "???";
                return 0;
            }
            
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
            var ts_hour = Math.floor( town.timestamp / millisPerHour ) * millisPerHour + 1000;
            
            // wine consumed per tick
            var consumption_per_tick = town.consumption / conticksperhour;
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
            var prod_per_tick = town.production / prodticksperhour;
            // production need to use the non-modified timestamp
            timediffms = curTime - town.timestamp;
            timediffhours = timediffms / millisPerHour;
            var prod_ticks = timediffhours * prodticksperhour;
            prod_ticks = Math.floor( prod_ticks );
            var produced = prod_per_tick * prod_ticks;
            
            // current stock
            town.stock = Math.round( town.reserve - consumed + produced );
            return town.stock;
        }
        
        
        function calc_happiness( town, numtowns )
        {
            // ** COMPUTE VALUES AT TIME SAVED **
            
            // H = (1 - Corruption) * TotalHappinessProduced - Population;
            // Corruption = (1 - (GR + 1) / (C + 1)) * 100
            var total_happiness = town.basicbonus + town.winebonus + town.ctbonus;
            var corruption = 0; //(1 - (town.grlevel + 1) / (numtowns + 1));
            //if( corruption < 0 ) corruption = 0;
            town.happiness = (1 - corruption) * total_happiness - town.population;
            //if( town.id == curr_city_id ) log( "town.happiness == " + town.happiness );
            town.happiness -= town.corruption;
            town.happiness -= 1; // for some reason, the happ level is less 1
            //if( town.id == curr_city_id ) log( "happ - corruption - 1 == " + town.happiness );
            
            
            
            
            // ** COMPUTE VALUES AT CURRENT TIME **
            
            // Growth at time t:
            //   p(t) = p0 + h(1-e^(t/50))
            //   where
            //     p0 is the starting population
            //     p(t) is the population after t hours
            //     h is initial happiness
            //     e is Euler's constant
            var curTime = new Date().getTime();
            var timediffms = curTime - town.timestamp;
            var timediffhours = timediffms / millisPerHour;
            town.population = town.population + town.happiness * (1 - Math.exp( timediffhours / 50 ) );
            
            town.happiness = (1 - corruption) * total_happiness - town.population;
            town.happiness -= town.corruption;
            town.happiness -= 1; // for some reason, the happ level is less 1
            
            // Growth = Happiness * 0.02;
            town.growth = town.happiness * 0.02;
            if( Math.round( town.population ) == town.housingspace )
                town.growth = 0;
            // Hours before town hall gets filled:
            //  50 ln( h / b-c )
            //   where
            //   ln is natural log
            //   h is initial happiness
            //   b is total positive satisfaction bonus
            //   c is capacity of Town hall
            //  if town capacity is bigger than bonus, TH will never fill, 
            //    and formula with result in error.
            town.hoursTillFilled = 50 * Math.log( town.happiness / (total_happiness - town.housingspace ) );
            if( ("" + town.hoursTillFilled) != "NaN" && town.hoursTillFilled >= 0 )
            {
                town.hoursTillFilled = formatTimeLeft( town.hoursTillFilled );
            }
            else
                town.hoursTillFilled = null;
            /*
            if( town.id == curr_city_id )
            {
                log( "Calculating Happiness (" + town.label + "):" );
                log( "   Total Happiness: " + total_happiness );
                log( "      Basic: " + town.basicbonus );
                log( "      Wine: " + town.winebonus );
                log( "      Culture: " + town.ctbonus );
                log( "   Corruption: " + corruption );
                log( "   Govt Corruption: " + town.corruption );
                log( "   Net Happiness: " + town.happiness );
                log( "   Growth: " + town.growth + " (" + town.hoursTillFilled + ")" );
            }
            */
        }
        
        
        // Update values
        var towns = new Array();
        $( "#dropDown_js_citySelectContainer div.bg ul li.ownCity" ).each( function(){
            var town = $(this).text();
            var id = $(this).attr( "selectvalue" );
            //var title = $(this).attr( "title" );
            var t = {};
            t.label = town;
            t.name = town.replace( /\[\d+:\d+\]\s+/, "" );
            t.id = id;
            t.luxury = "";//title.replace( "Trade good: ", "" );
            t.reserve = 0;
            t.consumption = 0;
            t.production = 0;
            t.timestamp = 0;
            t.stock = 0;
            t.low = false;
            t.timeLeft = "";
            t.basicbonus = 0;
            t.winebonus = 0;
            t.ctbonus = 0;
            t.population = 0;
            t.housingspace = 0;
            t.grlevel = 0;
            t.numtowns = 0;
            t.happiness = 0;
            t.growth = 0;
            t.hoursTillFilled = -1;
            t.corruption = 0;
            towns.push( t );
            
        });
        
        // populate objects with stored values and update stock
        var total_consumption = 0;
        var total_production = 0;
        for( var i = 0; i < towns.length; i++ )
        {
            var t = towns[ i ];
            var gm_r = gm_reserve + t.id;
            t.reserve = parseInt( GM_getValue( gm_r, 0 ) );
            var gm_c = gm_consumption + t.id;
            t.consumption = parseInt( GM_getValue( gm_c, 0 ) );
            var gm_t = gm_timestamp + t.id;
            t.timestamp = parseInt( GM_getValue( gm_t, 0 ) );
            var gm_p = gm_production + t.id;
            t.production = parseInt( GM_getValue( gm_p, 0 ) );
            var gm_bb = gm_basicbonus + t.id;
            t.basicbonus = parseInt( GM_getValue( gm_bb, 0 ) );
            var gm_wb = gm_winebase + t.id;
            t.winebonus = parseInt( GM_getValue( gm_wb, 0 ) );
            var gm_ws = gm_wineserving + t.id;
            t.winebonus += parseInt( GM_getValue( gm_ws, 0 ) );
            var gm_ctb = gm_ctbonus + t.id;
            t.ctbonus = parseInt( GM_getValue( gm_ctb, 0 ) );
            var gm_pop = gm_population + t.id;
            t.population = parseInt( GM_getValue( gm_pop, 0 ) );
            var gm_hs = gm_housingspace + t.id;
            t.housingspace = parseInt( GM_getValue( gm_hs, 0 ) );
            var gm_gr = gm_grlevel + t.id;
            t.grlevel = parseInt( GM_getValue( gm_gr, 0 ) );
            var gm_co = gm_corruption + t.id;
            t.corruption = parseInt( GM_getValue( gm_co, 0 ) );
            
            if( isNaN( t.timestamp ) )
                t.timestamp = 0;
            if( isNaN( t.reserve ) )
                t.reserve = 0;
            if( isNaN( t.production ) )
                t.production = 0;
            if( isNaN( t.consumption ) )
                t.consumption = 0;
            if( isNaN( t.basicbonus ) )
                t.basicbonus = 0;
            if( isNaN( t.winebonus ) )
                t.winebonus = 0;
            if( isNaN( t.ctbonus ) )
                t.ctbonus = 0;
            if( isNaN( t.population ) )
                t.population = 0;
            if( isNaN( t.housingspace ) )
                t.housingspace = 0;
            if( isNaN( t.grlevel ) )
                t.grlevel = 0;
            
            /*
            log( "Town:" );
            log( "  Label:      " + t.label );
            log( "  Name:       " + t.name );
            log( "  ID:         " + t.id );
            log( "  Good:       " + t.luxury );
            log( "  Reserve:    " + t.reserve );
            log( "  Consump:    " + t.consumption );
            log( "  Prod:       " + t.production );
            log( "  Timestamp:  " + t.timestamp );
            log( "  Stock:      " + t.stock );
            log( "  Low:        " + t.low );
            log( "  Time Left:  " + t.timeLeft );
            log( "  BasicBonus: " + t.basicbonus );
            log( "  WineBonus:  " + t.winebonus );
            log( "  CT Bonus:   " + t.ctbonus );
            log( "  Population: " + t.population );
            log( "  Pop Space:  " + t.housingspace );
            log( "  GR Level:   " + t.grlevel );
            log( "  Num Towns:  " + t.numtowns );
            log( "  Happiness:  " + t.happiness );
            log( "  Growth:     " + t.growth );
            log( "  Hours Fill: " + t.hoursTillFilled );
            */
            
            calc_current_stock( t )
            calc_happiness( t, towns.length - 1 );
            
            // forward project time till depletion
            if( t.production - t.consumption < 0 )
            {
                t.timeLeft = Math.floor( t.stock / t.consumption );
                t.low = t.timeLeft <= lowStockThresholdHours;
                t.timeLeft = formatTimeLeft( t.timeLeft );
            }
            
            if( t.consumption != null && t.consumption > 0 )
                total_consumption += t.consumption;
            if( t.production != null && t.production > 0 )
                total_production += t.production;
        }
        
        
        var netprod = total_production - total_consumption;
        var title = "Net production: ";
        if( netprod >= 0 ) title += "+";
        title += netprod;
        
        $( "#ikawine" ).attr( "title", title );
        
        var lowprodwarning = GM_getValue( gm_low_prod_warning, '1' );
        if( total_consumption > total_production && lowprodwarning == '1' )
        {
            title = "WARNING: Total consumption (-" + total_consumption + ") is less than Total Production (+" + total_production + ")!  Increase production by +" + (total_consumption - total_production) + ".";
            $( "#ikawine_header" ).addClass( "ikawine_warning" );
            $( "#ikawine" ).attr( "title", title );
        }
        else
        {
            $( "#ikawine_header" ).removeClass( "ikawine_warning" );
        }
        
        for( var i = 0; i < towns.length; i++ )
        {
            var t = towns[ i ];
            var row = $( "#ikawine_town_" + t.id )[ 0 ];
            if( row === undefined )
            {
                var html = "<tr id='ikawine_town_" + t.id + "'>";
                html    += "<td class='ikawine_town_name'>" + t.name + "</td>";
                html    += "<td class='ikawine_town_happ ikawine_val'></td>";
                html    += "<td class='ikawine_town_stock ikawine_val'>0</td>";
                html    += "<td class='ikawine_town_consumption ikawine_val' title='Consumption (evaluated hourly)'>0</td>";
                html    += "<td class='ikawine_town_production ikawine_val' title='Production (evaluated every minute)'>0</td>";
                html    += "</tr>";
                $( html ).appendTo( "#ikawine_table" );
                row = $( "#ikawine_town_" + t.id );
            }
            
            var happ_col    = $( "td.ikawine_town_happ", row );
            
            // happiness icon
            var icon = neutral_href;
            var icontitle = "";
            if( t.growth >= 6 )
            {
                icon = euphoric_href;
                icontitle = "Euphoric";
            }
            else if( t.growth >= 1 )
            {
                icon = happy_href;
                icontitle = "Happy";
            }
                else if( t.growth >= 0 )
                {
                    icon = neutral_href;
                    icontitle = "Neutral";
                }
                else if( t.growth >= -1 )
                {
                    icon = unhappy_href;
                    icontitle = "Unhappy";
                }
                    else
                {
                    icon = angry_href;
                    icontitle = "Angry";
                }
            //icontitle += "; Happiness is " + roundto( t.happiness,0 );
            var pop_perc = Math.round( t.population / t.housingspace * 100 );
            icontitle += "; Pop at " + pop_perc + "%";
            icontitle += "; Growth is " + roundto( t.growth, 100 ) + "/hour";
            if( t.hoursTillFilled != null )
                icontitle += " (" + t.hoursTillFilled + ")";
            var html = "<img width='15' title='" + icontitle + "' src='" + icon + "'/>";
            happ_col.html( html );
            
            
            // Stock (aka Reserve) Column
            var reserve_col = $( "td.ikawine_town_reserve", row );
            
            if( t.low && !reserve_col.hasClass( "ikawine_warning" ) )
                reserve_col.addClass( "ikawine_warning" );
            else
                reserve_col.removeClass( "ikawine_warning" );
            
            if( t.timeLeft != "" )
                title = "Stock left: " + t.timeLeft;
            else
                title = "Stock left: -";
            
            // Stock column
            var stock_col = $( "td.ikawine_town_stock", row );
            stock_col.attr( "title", title );
            stock_col.text( addCommas( t.stock ) );
            var name_col = $( "td.ikawine_town_name", row );
            name_col.attr( "title", title );
            
            // Consumption column
            var consumption_col = $( "td.ikawine_town_consumption", row );
            consumption_col.text( addCommas( t.consumption ) );
            
            // Production column
            var production_col = $( "td.ikawine_town_production", row );
            production_col.text( addCommas( t.production ) );
            
            if( t.consumption > 0 && t.happiness >= 60 && Math.round( t.population ) == t.housingspace )
            {
                $( "td.ikawine_town_name", row ).addClass( "ikawine_warning" );
                $( "td.ikawine_town_name", row ).attr( "title", "Wine consumption unnecessarily high!" );
            }
            else 
            {
                $( "td.ikawine_town_name", row ).removeClass( "ikawine_warning" );
            }
        }
        
        $( "#ikawine_table tr" ).each( function(){
            $(this).hover( 
                function(){
                    $(this).css( 'background-color', '#EDDF82' );
                },
                function(){
                    $(this).css( 'background-color', '' );
                }
            );
        });
        
        //displayLog();
    } /* End update() */
    
    
    
    // Update display
    
    function addToMenuSlots()
    {
        var style = "display: inline-block; width: auto; height: auto; padding-bottom: 5px; border: 1px solid white; ";
        style += "vertical-align: top; text-align: left; ";
        style += "background: none; background-color: #cab082; ";
        style += "overflow: visible; left: 0px; ";
        
        var li = '<li id="ikawine" class="expandable slot5" style="' + style + '">';
        //li += '<div class="image"></div>';
        li += '<div>';
        //li += '<div class="name">';
        li += '<span class="namebox"><table id="ikawine_table">';
        li += '<tr><th id="ikawine_header" colspan="2">Wine Stock</th></tr>';
        li += '</table></span>';
        li += '</li>';
        $( li ).insertAfter( "#js_viewCityMenu ul li:last" );
        
        GM_addStyle( "#ikawine_table{ margin: 10px 5px 0px 5px; }" );
        GM_addStyle( "#ikawine td{ margin: 0px 5px 0px 5px; }" );
        GM_addStyle( "#ikawine td.ikawine_town_name{ font-weight: bold; }" );
        //GM_addStyle( "#ikawine td.ikawine_town_name:hover{ cursor:pointer; text-decoration:underline; }" );
        GM_addStyle( ".ikawine_val{ text-align:right; padding: 0px 0px 0px 5px; }");
        GM_addStyle( ".ikawine_warning{ text-decoration:blink; color:red; font-weight:bold; }" );
        
        /*
        $( "#ikawine" ).on( "click", function(){
            ikawine_update();
        });
        */
    }
    
    addToMenuSlots();
    ikawine_update();
    
    setInterval( ikawine_update, 1000 );
});

