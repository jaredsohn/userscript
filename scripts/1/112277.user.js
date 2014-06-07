// ==UserScript==
// @name           grepoMarketHelper
// @author         wBw
// @license        Do what you want!
// @namespace      wBs_
// @include        http://*.grepolis.*/game/building_market?*
// @include        http://*.grepolis.*/game/building_hide?*
// @include        http://*.grepolis.*/town_overviews?action=hides_overview*
// @include        http://*.grepolis.*/town_overviews?action=culture_overview*
// @version        1.0
// ==/UserScript==

var uW;
var server = "";
var language = "de";

var text_translations =
{
"de" :
{
      popups : {
        // Texts uses in pop-ups.
        show_games  : "Anzeige olympischer Spiele an/aus.",
        show_theater: "Anzeige Theaterspiele an/aus.",
        show_party  : "Anzeige Stadtfeste an/aus.",
        show_triumph: "Anzeige Triumphzüge an/aus.",
        next_party  : "Click zum <b>Ausführen</b> eines Stadtfestes.",
        auto_party  : "Click zum <b>automatischen Ausführen</b> möglicher Stadtfeste.",
        no_party    : "Kein weiteres Stadtfest möglich.",
        next_triumph: "Click zum <b>Ausführen</b> eines Triumphzugs.",
        auto_triumph: "Click zum <b>automatischen Ausführen</b> möglicher Triumphzüge.",
        no_triumph: "Kein weiterer Triumphzug möglich."
      }
},
"en" :
{
      popups : {
        // Texts uses in pop-ups.
        show_games  : "Show olympic games on/off.",
        show_theater: "Show theater plays on/off.",
        show_party  : "Show town parties on/off.",
        show_triumph: "Show triumph parties on/off.",
        next_party  : "Click for <b>start</b> of one town party.",
        auto_party  : "Click for <b>automatic start</b> of all possible town parties.",
        no_party    : "No further town party available.",
        next_triumph: "Click for <b>start</b> of one victory procession.",
        auto_triumph: "Click for <b>automatic start</b> of all possible victory processions.",
        no_triumph  : "No further triumph party available."
      }
}
};

if (typeof unsafeWindow === 'object'){
    uW = unsafeWindow;
} else {
    uW = window;
}

//get jQuery
var $ = uW.jQuery;

// Min iron to left in warehouse
var hideMinIron = 15000;

var log = function (msg)
{
    try {
        if ( typeof GM_log !== 'undefined' )
            GM_log( msg );
        else
        {
            if (  typeof opera.postError !== 'undefined' )
                opera.postError( msg );
            else
                uW.console.log(msg);
        }
    }
    catch (e) {};
};

function storeValue( name, value )
{
    try
    {
        GM_setValue( name, value );
    }
    catch (e) {
        log( "failed - "+e );
    }
};

function readValue( name )
{
    try
    {
        return GM_getValue( name );
    }
    catch (e)
    {
        log( e );
    }
    return null;
};

Market = {

    adaptSliders : function ()
    {
        var cap = parseInt( $('#trade_capacity').text() );

        $( '.market_offers .slider_input').each( function(index, sliderInput)
        {
            if ( parseInt( sliderInput.value ) > cap )
            {
                sliderInput.value = cap;

                // Update slider
                var id = sliderInput.id;
                // e.g. offer_input_123456
                id = parseInt( id.substr( id.lastIndexOf('_')+1 ) );
                $( '#slide_offer_'+id ).slider( 'value', cap );
            }
        } );
    },

    adapt : function()
    {
        this.adaptSliders();

        // Hook into update after ajax post
        var oldUpdate = uW.Layout.updateBar;
        uW.Layout.updateBar = function()
        {
            Market.adaptSliders();
            oldUpdate.apply( this, arguments );
        };
    }

};

HidesOverview =
{

    adapt : function ()
    {
        $( '.town_item').each( function(index, town)
        {
            // e.g. "town_12345"
            var id = town.id;
            var townId = parseInt( id.substr( id.lastIndexOf('_')+1 ) );

            // e.g. "(33877/8)"
            var range = $('#'+id+' .eta' ).text();
            var cur = parseInt( range.substring( range.indexOf('(')+1, range.indexOf('/') ));
            var max = parseInt( range.substring( range.indexOf('/')+1, range.indexOf(')') ));
            if ( isNaN( max ) )
                max = 9999999;
            var cap = max-cur;

            var warehouseIron = parseInt( $('#'+id+'_res .iron .count').text() );
            if ( (warehouseIron-cap) < hideMinIron )
                cap = warehouseIron-hideMinIron;

            if ( cap > 0 )
                $( '#town_hide_'+townId )[0].value = cap;
        } );
    }
};

Hide =
{
    adapt : function()
    {
        // Must be delayed
        setTimeout( Hide.adaptSlider, 0 );
    },

    adaptSlider : function()
    {
        var input = $('#unit_order_input')[0];
        var max           = parseInt( $('#unit_order_max' ).text() );
        var warehouseIron = parseInt( $('#iron_count' ).text() );


        if ( (warehouseIron-max) < hideMinIron )
            max = warehouseIron-hideMinIron;

        if ( max > 0 )
        {
            input.value = max;
            var slider = $( '#unit_order_slider' );
            slider.slider( 'value', max );
            slider.change();
        }
    }
};

/**
 * Culture Overview module
 */
CultureOverview =
{
    /**
     *
     * Possibly forbitten to use. Deactivate it!
     */
    activateAutoParty : true,

    // Mapping from celeb type name to "show" switch
    typeSwitch :
    {
        triumph : 'Culture_ShowTriumph',
        theater : 'Culture_ShowTheater',
        games   : 'Culture_ShowGames',
        party   : 'Culture_ShowParty'
    },

    Counters :
    {
        party   : 0,
        games   : 0,
        theater : 0,
        triumph : 0
    },

    CurrentJob :
    {
        type : null,
        delay : 511
    },

    /**
     * Get all active celebration button fields of one type.
     * types:
     *  'party'
     *  'games'
     *  'theater'
     *  'triumph'
     */
    getCelebrationButtons : function ( type )
    {
        return $('.confirm.type_'+type+':not(.disabled)');
    },

    startNextCelebration : function()
    {
        var type = CultureOverview.CurrentJob.type;
      
	console.log("test");
	if ( type )
        {
            var celebs  = CultureOverview.getCelebrationButtons(CultureOverview.CurrentJob.type);
	    
            if ( celebs.length > 0 ){
		console.log("onclick" + celebs[0].onclick());
		celebs[0].onclick();
	    }
            else{
                CultureOverview.CurrentJob.type = null;
		}
        }
    },

    updateVisibility : function ( onlyType )
    {
        // Switch celebration fields
        for( var type in CultureOverview.typeSwitch )
        {
            if ( onlyType === undefined || onlyType == type )
            {
                var isOn = uW[ "_mh_"+CultureOverview.typeSwitch[type] ];
                $("#mh_"+type+"BtOL").css('display', isOn ? 'none' : 'block');
                $(".celebration:has(.type_"+type+")").css('display', isOn ? '' : 'none');
            }
        }
    },

    updateCounters : function ()
    {
        for (var cname in CultureOverview.Counters )
        {
            CultureOverview.Counters[cname] = CultureOverview.getCelebrationButtons( cname ).length;
            $('#mh_'+cname+'Count').html(
                '<span class="place_unit_black">'+CultureOverview.Counters[cname]+'</span>'+
                '<span class="place_unit_white">'+CultureOverview.Counters[cname]+'</span>' );
        }
        $('#mh_autoParty'  ).setPopup( (CultureOverview.Counters.party > 0) ? (CultureOverview.activateAutoParty ? 'auto_party'   : 'next_party'  ) : 'no_party' );
        $('#mh_autoTriumph').setPopup( (CultureOverview.Counters.triumph > 0) ? (CultureOverview.activateAutoParty ? 'auto_triumph' : 'next_triumph') : 'no_triumph' );
    },

    /**
     * Ajax-callback, executed after the result was handled by grepo (just because it was called via setTimeout)
     */
    ajaxCallback : function( data )
    {
        /* Example for "data":
            { result :
                { success:"Die Feier hat begonnen.",
                  startable_celebrations: {"party":false,"games":false,"theater":false,"triumph":false},
                  finished_at:123456789,
                  town_id:123,
                  celebration_type:"triumph",
                  bar:[]
                },
              url : "/game/town_overviews?action=start_celebration&town_id=123&h=abcdef123",
              json: {"town_id": 123, "celebration_type": "triumph"}
            }
        */
        if ( data.result )
        {
            if ( data.result.success && CultureOverview.activateAutoParty )
            {
                // Request was successful, trigger next celebration
                setTimeout( CultureOverview.startNextCelebration, CultureOverview.CurrentJob.delay );
            }
            else
            {
                // If something failed or auto is off, re-activate our buttons
                CultureOverview.CurrentJob.type = null;

                if ( !data.result.success )
                {
                    // Check if the last (failed) request was a celebration and deactivate the buttons in this case!
                    if ( data.json && data.json.celebration_type )
                    {
                        if ( data.json.celebration_type == "triumph" )
                        {
                            // The last request was for "triumph".
                            // Disable ALL "triumph"-buttons
                            $(".confirm.type_triumph").addClass( 'disabled' );
                        }
                        else
                        {
                            // Disable the button of the last request
                            $("#town_"+data.json.town_id+" .confirm.type_"+data.json.celebration_type).addClass( 'disabled' );
                        }
                    }
                }
            }
        }

        CultureOverview.updateCounters();
    },

    adapt : function ()
    {
        // Common styles for all buttons (should be moved to css...)
        var commonStyle = "cursor:pointer;background-image:url('http://static.grepolis.com/images/game/overviews/celebration_bg.png');height:22px;width:25px;float:right;position:relative;";

        // Parent container for buttons
        var parent = $('<div style="float:right;margin-top:2px;"></div>');
        parent.appendTo( $('.menu_inner')[0] );

        var bgOffs = { party:-113, games:-143, theater:-173, triumph:-204};

        // Auto-start buttons
        var startTriumphP = $(
         "<div id='mh_autoTriumph' onclick='mh_startCelebration(\"triumph\")' style=\""+commonStyle+"background-position:0 "+bgOffs.triumph+"px;border:2px outset red;\">"
        +"</div>" );

        var startPartyP = $(
         "<div id='mh_autoParty' onclick='mh_startCelebration(\"party\")' style=\""+commonStyle+"background-position:0 "+bgOffs.party+"px;border:2px outset red;\">"
        +"</div>" );

//        var startPartyP = $(
//         "<div id='mh_autoParty' onclick='alert(\"party\")' style=\""+commonStyle+"background-position:0 "+bgOffs.party+"px;border:2px outset red;\">"
//        +"</div>" );

        startTriumphP.appendTo( parent );
        $('<div style="float:right;width:2px;height:1px;"/>').appendTo( parent );
        startPartyP.appendTo( parent );
        $('<div style="float:right;width:12px;height:1px;"/>').appendTo( parent );

        // "Show" switch buttons
        for (var type in this.typeSwitch )
        {
            // Create code for view switches
            var bt = $(
                 "<div onclick='mh_switchCelebrations(\""+type+"\");' style=\""+commonStyle+"border:2px groove gray;background-position:0 "+
                 bgOffs[type]+"px;\">"
                +  "<div id='mh_"+type+"BtOL' style='width:100%;height:100%;opacity:0.3;background:black;'></div>"
                +  "<div id='mh_"+type+"Count'/>"
                +"</div>" );

            bt.appendTo( parent );
            $('<div style="float:right;width:2px;height:1px;"/>').appendTo( parent );
            bt.setPopup( 'show_'+type );

            // Set flags in game window initial from storage.
            var swt = this.typeSwitch[ type ];
            var val = readValue( swt );
            if ( val === undefined ) // if not in storage, fallback to default
                val = "yes";
            uW[ "_mh_"+swt ] = (val == "yes" ? true:false) ;
        }

        // Click callback for view switches above
        uW.mh_switchCelebrations = function( type )
        {
            var swt  = CultureOverview.typeSwitch[type];
            var wVar = "_mh_"+swt;
            uW[ wVar ] = !uW[ wVar ];
            CultureOverview.updateVisibility( type );
            uW.setTimeout( storeValue, 0, swt, uW[ wVar ] ?"yes":"no" );
        };

        // Click callback for start buttons above
        uW.mh_startCelebration = function( type )
        {
            
		if ( CultureOverview.CurrentJob.type == null )
            {
		CultureOverview.CurrentJob.type = type;
                CultureOverview.startNextCelebration();
            }
        };

        // Update visibility of all types.
        this.updateVisibility();

        // Calc Counters
        this.updateCounters();

        // Hook in to update counters after ajax requests
        $("body").ajaxComplete( function(e, xhr, settings)
        {
            var result = null;
            var json = null;
            try
            {
                result = $.parseJSON( xhr.responseText );
                // settings.data contains something like "json={...}"
                json = $.parseJSON( unescape( settings.data.replace( /\+/g, " ") ).substr(5) );
            }
            catch (e) { };

            setTimeout( CultureOverview.ajaxCallback, 0, { result : result, url : settings.url, json : json } );
        } );
    }
};

function init ()
{
    var sr = /(([a-zA-Z]+)\w+)\.grepolis\.\w+/.exec( uW.location.host );
    if (sr)
    {
        server = sr[1];
        language = sr[2];
    }

    var texts = text_translations[language];
    // If language has no translation, use english
    if ( !texts )
        texts = text_translations["en"];

    uW.PopupFactory.addTexts( texts.popups );

    if ( uW.document.URL.indexOf("/building_market")>0 )
        Market.adapt();
    else if ( uW.document.URL.indexOf("/building_hide")>0 )
        Hide.adapt();
    else if ( uW.document.URL.indexOf("=hides_overview")>0 )
        HidesOverview.adapt();
    else if ( uW.document.URL.indexOf("=culture_overview")>0 )
        CultureOverview.adapt();
};

init();

