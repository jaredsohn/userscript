// ==UserScript==
// @name        Ikariam Trade Manager
// @version     1.0
// @copyright   2013, Aaron Mitchell
// @license     GPLv3+ (http://www.gnu.org/copyleft/gpl.html)
// @namespace   mitchellcoding.com
// @description Displays a form that allows the player to enter trade requests and matches players who desire/desire compatible resources
// @include     http://s*.ikariam.*/*
// @exclude     http://support.ikariam.*/*
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_addStyle
// @require     http://code.jquery.com/jquery-2.0.3.min.js
// @history 1.0 Initial version
// ==/UserScript==

$( document ).ready( function(){
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
    
    function clearLog()
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

	var icondata = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB90LBREyOPrsQdoAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAADpklEQVRo3uWa20sUURzHP+dYbqIF9WAG5pulXTYUsQhatwcvhBL4UJgEYSD1X2xPgf9A+ijh5c22t9ByegmywAuo2VNQSr5JeF3R6cHdcXZ2ZnZmd50Z6wvDDnsue777/f7m/M45A/8IxBH0GU1e2aAkr8AQMQ48qhuoXRtjnbyIiQIQMB3Us+LiSauG/YnEXRvyORESBSJgO/Bs0BHLmZDIgUSsUAQcEIo5JSNyVCFWSAIWhGJu1BF+q1AodYQLEjEvCGRRx5KMCDIJN2Skg2e9ryQAkr8fM4zLEZGUNxW/SRjIKFaZg3QQ3EGCorNX1AmRQFjKjcVk0C3l1GLSQTIXRChGVU4Y1VBVtQkoiBrPQyEAXu3sZJS97u3l0+CgbfvbT57weGAgsyAUmuxPJF7oHSRN1PAEN7u7862Tpoq0KDwy7O/tAVAdiXD24kXLeueqqqi+cyetjUWsZFgrzQ5W0NskW10zLE5McLW1FSEEjV1dvOvrM63X2NWFEAeJx8L4ONfa2mz7lS6Xp3nj8/DwoXUePbK2la5sStfGavKWXj+tZuJxttfXAbhQW0tVXV1Gnar6eipqagDYXl9n5u3brHEinS5PC4XdrS1m3ryxDWj9d9NjY+xubWWbU2yTxqOz19CQdt/w8CGyqOjQ60VFNDx4YFrXSYx4iqXJSdaWlwE4U15ObXOzVnalpYUz5eUArC0v811RgktEVVWmRkdNraS/nxoZQVXV4BIxWuZGRwehsjJOnT5NuL3dta1M5xGvsDI/z6+5OSrDYYpLSqjv7EQIQXFJCQA/Z2dZWVgIPpHUP14ZDmuWSk2AbtUwWiuaXBt7hqnRUS39uNTURHUkoqUkX3Qx5GCnBQlcB75KOBmCe14S+fP7N98+fDjYBRFCU2Tx/Xv+rK466UKbyCXwEqislvLUeSGuAd1AK9AB3AIiQA1wGbhg6Ogj8DT5+SPfoM/RVgqgnADuA3tL+/sVyQI3vTQlr7xSlp2NDUKlpYcpSTzuuh8J7PkZJ4nNTaZ1KctMPG6ZkljFh/GppXiZBesx2NPDYE+P22Zpia40es0PVdxCp4ZilTQqfix7c0DGssOMyHFQJU0NMN/EjhKQzWsLS2ljs1MkpUosoBaLmpGwy34DZzGzAHeaxqcqx/wmY3IUl4H/4sTKjIzCMT1DxLDvFfVCnaM61fVMHS/O2e3UyZuQH28+ZCOkPfGOw7soVoQs8yAnuRI+vh3klBhZJt2C4C9MUI9b4ermpwAAAABJRU5ErkJggg==";
    var host = "http://" + window.location.host;
    var woodicon   = host + "/skin/resources/icon_wood.png";
    var wineicon   = host + "/skin/resources/icon_wine.png";
    var marbleicon = host + "/skin/resources/icon_marble.png";
    var crystalicon = host + "/skin/resources/icon_glass.png";
    var sulphuricon = host + "/skin/resources/icon_sulfur.png";
    //var sulphurcon = "http://s20-us.ikariam.gameforge.com/skin/resources/icon_sulphur.png";
    var request_row_count = 0;
    
    function ikatm_display()
    {
        var divId = "ikatm_window";
        var tm_html = 
            "<div id='" + divId + "' style='padding: 5px 5px;'> \
<table>							\
<tr> \
<td>&nbsp;</td>\
<td colspan='5'><center><b>Offer</b></center></td>\
<td>&nbsp;</td>\
<td colspan='5'><center><b>Desire</b></center></td>\
<td></td>\
</tr>\
<tr> \
<td>Player</td>\
<td><center><img src='" + woodicon + "'/></center></td>\
<td><center><img src='" + wineicon + "'/></center></td>\
<td><center><img src='" + marbleicon + "'/></center></td>\
<td><center><img src='" + crystalicon + "'/></center></td>\
<td><center><img src='" + sulphuricon + "'/></center></td>\
<td></td>\
<td><center><img src='" + woodicon + "'/></center></td>\
<td><center><img src='" + wineicon + "'/></center></td>\
<td><center><img src='" + marbleicon + "'/></center></td>\
<td><center><img src='" + crystalicon + "'/></center></td>\
<td><center><img src='" + sulphuricon + "'/></center></td>\
<td></td>\
</tr>\
<tr id='ikatm_new_trade_row'> \
<td><input type='text' id='ikatm_new_trade_player' size='7'/></td>\
<td><input type='text' id='ikatm_new_trade_offer_bm' size='3'/></td>\
<td><input type='text' id='ikatm_new_trade_offer_w' size='3'/></td>\
<td><input type='text' id='ikatm_new_trade_offer_m' size='3'/></td>\
<td><input type='text' id='ikatm_new_trade_offer_c' size='3'/></td>\
<td><input type='text' id='ikatm_new_trade_offer_s' size='3'/></td>\
<td>&nbsp;&nbsp;&nbsp;</td>\
<td><input type='text' id='ikatm_new_trade_desire_bm' size='3'/></td>\
<td><input type='text' id='ikatm_new_trade_desire_w' size='3'/></td>\
<td><input type='text' id='ikatm_new_trade_desire_m' size='3'/></td>\
<td><input type='text' id='ikatm_new_trade_desire_c' size='3'/></td>\
<td><input type='text' id='ikatm_new_trade_desire_s' size='3'/></td>\
</tr>\
<tr>\
<td colspan='13'><center><button id='ikatm_update'>Save & Update</button></center></td>\
</tr>\
</table>\
<br/>\
<center>\
<table id='ikatm_trades_table'>\
<tr>\
<td colspan='5'><center><b>Trades</b></center></td>\
</tr>\
</table>\
</center>\
<br/><br/>\
</div>";
        
        var link_html =
            "<div id='ikatm_icon_div'>\
<img id='ikatm_icon'/> \
</div>";
        
        
        
        $( tm_html ).appendTo( "body" );
        $( "#" + divId ).css( "border", "1px solid black" );
        
        var icon_width = 50;
        var icon_height = 50;
        $( link_html ).appendTo( "body" );
        $( "#ikatm_icon" ).attr( "src", icondata );
        $( "#ikatm_icon" ).attr( "title", "Show/Hide Trade Manager" );
        $( "#ikatm_icon" ).css( "width", icon_width + "px" );
        $( "#ikatm_icon" ).css( "height", icon_height + "px" );
        
        
        $( "#ikatm_icon" ).click( function(){
            var div = $( "#" + divId );
            if( div.css( "visibility" ) == 'hidden' )
                div.css( "visibility", 'visible' );
            else
            {
                div.css( "visibility", 'hidden' );
            }
        });
        
        $( "#ikatm_update" ).click( function(){
            ikatm_update();
            ikatm_save();
        });
        
        var icon_left = 0;
        var icon_top = 125;
        
        var cssIconDivId = "#ikatm_icon";
        var cssDivId = "#" + divId;
        
        // put icon in upper-right corner
        $( cssIconDivId ).css( "position", "absolute" );
        $( cssIconDivId ).css( "zIndex", 100 );
        $( cssIconDivId ).css( "left", icon_left + "px" );
        $( cssIconDivId ).css( "top" , icon_top + "px" );
        
        var notes_left = icon_width + 5;
        var notes_top = icon_top;
        $( cssDivId ).css( "position", "absolute" );
        $( cssDivId ).css( "left", notes_left + "px" );
        $( cssDivId ).css( "top", notes_top + "px" );
        $( cssDivId ).css( "background-color", "#d7bd89" );
        $( cssDivId ).css( "padding", "5 5 5 5" );
        
        // set notes_div hidden
        $( cssDivId ).css( "visibility", "hidden" );
        $( cssDivId ).css( "zIndex", 150 );
        //$( cssDivId ).css( "width", notes_width + "px" );
        
        /*
        $( "#ikatm_trades_table td" ).css( "padding-left", "5px" );
        $( "#ikatm_trades_table td" ).css( "padding-right", "5px" );
        $( ".ikatm_trade_row td" ).css( "padding-left", "5px" );
        $( ".ikatm_trade_row td" ).css( "padding-right", "5px" );
        */
    }
    
    function ikatm_save()
    {
        var index = 0;
        $( ".ikatm_trade_request" ).each( function(){
            var req = {
                player    : $( "input.ikatm_req_player", this ).val(),
                offer_bm  : $( "input.ikatm_req_offer_bm", this ).val(),
                offer_w   : $( "input.ikatm_req_offer_w", this ).val(),
                offer_m   : $( "input.ikatm_req_offer_m", this ).val(),
                offer_c   : $( "input.ikatm_req_offer_c", this ).val(),
                offer_s   : $( "input.ikatm_req_offer_s", this ).val(),
                desire_bm : $( "input.ikatm_req_desire_bm", this ).val(),
                desire_w  : $( "input.ikatm_req_desire_w", this ).val(),
                desire_m  : $( "input.ikatm_req_desire_m", this ).val(),
                desire_c  : $( "input.ikatm_req_desire_c", this ).val(),
                desire_s  : $( "input.ikatm_req_desire_s", this ).val()
            };
            
            var key = "ikatmreq-" + window.location.host + "-" + index + "-";
            GM_setValue( key + "player",   req.player );
            GM_setValue( key + "offer_bm", req.offer_bm );
            GM_setValue( key + "offer_w",  req.offer_w );
            GM_setValue( key + "offer_m",  req.offer_m );
            GM_setValue( key + "offer_c",  req.offer_c );
            GM_setValue( key + "offer_s",  req.offer_s );
            GM_setValue( key + "desire_bm", req.desire_bm );
            GM_setValue( key + "desire_w",  req.desire_w );
            GM_setValue( key + "desire_m",  req.desire_m );
            GM_setValue( key + "desire_c",  req.desire_c );
            GM_setValue( key + "desire_s",  req.desire_s );
            index += 1;
            
            /*
            log( "Saving:" );
            log( key + "player = " + req.player );
            log( key + "offer_bm = " + req.offer_bm );
            log( key + "offer_w = " + req.offer_w );
            log( key + "offer_m = " + req.offer_m );
            log( key + "offer_c = " + req.offer_c );
            log( key + "offer_s = " + req.offer_s );
            log( key + "desire_bm = " + req.desire_bm );
            log( key + "desire_w = " + req.desire_w );
            log( key + "desire_m = " + req.desire_m );
            log( key + "desire_c = " + req.desire_c );
            log( key + "desire_s = " + req.desire_s );
            displayLog();
            clearLog();
            */
        });
        GM_setValue( "ikatmreq-" + window.location.host + "-count", index );
        //log( "ikatmreq-count = " + index );
        //displayLog();
        //clearLog();
    }
    
    
    function ikatm_load()
    {
        var count = GM_getValue( "ikatmreq-" + window.location.host + "-count", 0 );
        log( "Loading " + count + " rows" );
        for( var i = 0; i < count; i++ )
        {
            var key = "ikatmreq-" + window.location.host + "-" + i + "-";
            var req = {
                player:    GM_getValue( key + "player", "?" ),
                offer_bm:  GM_getValue( key + "offer_bm",  "" ),
                offer_w:   GM_getValue( key + "offer_w",   "" ),
                offer_m:   GM_getValue( key + "offer_m",   "" ),
                offer_c:   GM_getValue( key + "offer_c",   "" ),
                offer_s:   GM_getValue( key + "offer_s",   "" ),
                desire_bm: GM_getValue( key + "desire_bm", "" ),
                desire_w:  GM_getValue( key + "desire_w",  "" ),
                desire_m:  GM_getValue( key + "desire_m",  "" ),
                desire_c:  GM_getValue( key + "desire_c",  "" ),
                desire_s:  GM_getValue( key + "desire_s",  "" )
            };
            /*
            log( "Loading:" );
            log( key + "player = " + req.player );
            log( key + "offer_bm = " + req.offer_bm );
            log( key + "offer_w = " + req.offer_w );
            log( key + "offer_m = " + req.offer_m );
            log( key + "offer_c = " + req.offer_c );
            log( key + "offer_s = " + req.offer_s );
            log( key + "desire_bm = " + req.desire_bm );
            log( key + "desire_w = " + req.desire_w );
            log( key + "desire_m = " + req.desire_m );
            log( key + "desire_c = " + req.desire_c );
            log( key + "desire_s = " + req.desire_s );
            
            displayLog();
            clearLog();
            */
            
            ikatm_add_request_row( req );
        }
    }
    
    
    function ikatm_add_request_row( req )
    {
        var row = 
            "<tr id='ikatm_trade_request_" + request_row_count + "' class='ikatm_trade_request'> \
<td><input type='text' size='7' value='" + req.player + "' class='ikatm_req_player'/></td>\
<td><input type='text' size='3' value='" + req.offer_bm + "' class='ikatm_req_offer_bm'/></td>\
<td><input type='text' size='3' value='" + req.offer_w + "' class='ikatm_req_offer_w'/></td>\
<td><input type='text' size='3' value='" + req.offer_m + "' class='ikatm_req_offer_m'/></td>\
<td><input type='text' size='3' value='" + req.offer_c + "' class='ikatm_req_offer_c'/></td>\
<td><input type='text' size='3' value='" + req.offer_s + "' class='ikatm_req_offer_s'/></td>\
<td>&nbsp;&nbsp;&nbsp;</td>\
<td><input type='text' size='3' value='" + req.desire_bm + "' class='ikatm_req_desire_bm'/></td>\
<td><input type='text' size='3' value='" + req.desire_w + "' class='ikatm_req_desire_w'/></td>\
<td><input type='text' size='3' value='" + req.desire_m + "' class='ikatm_req_desire_m'/></td>\
<td><input type='text' size='3' value='" + req.desire_c + "' class='ikatm_req_desire_c'/></td>\
<td><input type='text' size='3' value='" + req.desire_s + "' class='ikatm_req_desire_s'/></td>\
<td><center><button id='ikatm_trade_request_remove_" + request_row_count + "'>Remove</button></center></td>\
</tr>";
        $( row ).insertBefore( "#ikatm_new_trade_row" );
        $( "#ikatm_trade_request_remove_" + request_row_count ).click( function(){
            var id = $( this ).attr( "id" ).replace( "ikatm_trade_request_remove_", "" ).trim();
            $( "#ikatm_trade_request_" + id ).remove();
        });
        request_row_count += 1;
    }
    
    function ikatm_update()
    {
        // Check if new trade request added and append it to table
        var player = $( "#ikatm_new_trade_player" ).val().trim();
        if( player != "" )
        {
            var req = {
                player: player,
                offer_bm  : $( "#ikatm_new_trade_offer_bm" ).val().trim().replace( ",", "" ),
                offer_w   : $( "#ikatm_new_trade_offer_w" ).val().trim().replace( ",", "" ),
                offer_m   : $( "#ikatm_new_trade_offer_m" ).val().trim().replace( ",", "" ),
                offer_c   : $( "#ikatm_new_trade_offer_c" ).val().trim().replace( ",", "" ),
                offer_s   : $( "#ikatm_new_trade_offer_s" ).val().trim().replace( ",", "" ),
                desire_bm : $( "#ikatm_new_trade_desire_bm" ).val().trim().replace( ",", "" ),
                desire_w  : $( "#ikatm_new_trade_desire_w" ).val().trim().replace( ",", "" ),
                desire_m  : $( "#ikatm_new_trade_desire_m" ).val().trim().replace( ",", "" ),
                desire_c  : $( "#ikatm_new_trade_desire_c" ).val().trim().replace( ",", "" ),
                desire_s  : $( "#ikatm_new_trade_desire_s" ).val().trim().replace( ",", "" )
            };
                
            ikatm_add_request_row( req );
            
            $( "#ikatm_new_trade_player" ).val( "" );
            $( "#ikatm_new_trade_offer_bm" ).val( "" );
            $( "#ikatm_new_trade_offer_w" ).val( "" );
            $( "#ikatm_new_trade_offer_m" ).val( "" );
            $( "#ikatm_new_trade_offer_c" ).val( "" );
            $( "#ikatm_new_trade_offer_s" ).val( "" );
            $( "#ikatm_new_trade_desire_bm" ).val( "" );
            $( "#ikatm_new_trade_desire_w" ).val( "" );
            $( "#ikatm_new_trade_desire_m" ).val( "" );
            $( "#ikatm_new_trade_desire_c" ).val( "" );
            $( "#ikatm_new_trade_desire_s" ).val( "" );
        }
        
        // Update Possible Trades
        var requests = [];
        $( ".ikatm_trade_request" ).each( function(){
            var req = {
                player    : $( "input.ikatm_req_player", this ).val(),
                offer_bm  : $( "input.ikatm_req_offer_bm", this ).val(),
                offer_w   : $( "input.ikatm_req_offer_w", this ).val(),
                offer_m   : $( "input.ikatm_req_offer_m", this ).val(),
                offer_c   : $( "input.ikatm_req_offer_c", this ).val(),
                offer_s   : $( "input.ikatm_req_offer_s", this ).val(),
                desire_bm : $( "input.ikatm_req_desire_bm", this ).val(),
                desire_w  : $( "input.ikatm_req_desire_w", this ).val(),
                desire_m  : $( "input.ikatm_req_desire_m", this ).val(),
                desire_c  : $( "input.ikatm_req_desire_c", this ).val(),
                desire_s  : $( "input.ikatm_req_desire_s", this ).val()
            };
            if( req.offer_bm  != "" ) req.offer_bm  = parseInt( req.offer_bm );
            if( req.offer_w   != "" ) req.offer_w   = parseInt( req.offer_w );
            if( req.offer_m   != "" ) req.offer_m   = parseInt( req.offer_m );
            if( req.offer_c   != "" ) req.offer_c   = parseInt( req.offer_c );
            if( req.offer_s   != "" ) req.offer_s   = parseInt( req.offer_s );
            if( req.desire_bm != "" ) req.desire_bm = parseInt( req.desire_bm );
            if( req.desire_w  != "" ) req.desire_w  = parseInt( req.desire_w );
            if( req.desire_m  != "" ) req.desire_m  = parseInt( req.desire_m );
            if( req.desire_c  != "" ) req.desire_c  = parseInt( req.desire_c );
            if( req.desire_s  != "" ) req.desire_s  = parseInt( req.desire_s );
            requests.push( req );
        });
        
        // match trades
        var trades = [];
        for( var i = 0; i < requests.length - 1; i++ )
        {
            var request1 = requests[ i ];
            
            var offers1 = [];
            if( request1.offer_bm != "" ) offers1.push( "bm" );
            if( request1.offer_w  != "" ) offers1.push( "w"  );
            if( request1.offer_m  != "" ) offers1.push( "m"  );
            if( request1.offer_c  != "" ) offers1.push( "c"  );
            if( request1.offer_s  != "" ) offers1.push( "s"  );
            
            var desires1 = [];
            if( request1.desire_bm != "" ) desires1.push( "bm" );
            if( request1.desire_w  != "" ) desires1.push( "w"  );
            if( request1.desire_m  != "" ) desires1.push( "m"  );
            if( request1.desire_c  != "" ) desires1.push( "c"  );
            if( request1.desire_s  != "" ) desires1.push( "s"  );
            
            for( var j = i + 1; j < requests.length; j++ )
            {
                var request2 = requests[ j ];
                var offers2 = [];
                if( request2.offer_bm != "" ) offers2.push( "bm" );
                if( request2.offer_w  != "" ) offers2.push( "w"  );
                if( request2.offer_m  != "" ) offers2.push( "m"  );
                if( request2.offer_c  != "" ) offers2.push( "c"  );
                if( request2.offer_s  != "" ) offers2.push( "s"  );
                
                var desires2 = [];
                if( request2.desire_bm != "" ) desires2.push( "bm" );
                if( request2.desire_w  != "" ) desires2.push( "w"  );
                if( request2.desire_m  != "" ) desires2.push( "m"  );
                if( request2.desire_c  != "" ) desires2.push( "c"  );
                if( request2.desire_s  != "" ) desires2.push( "s"  );
                
                var matches1 = [];
                for( var o1 = 0; o1 < offers1.length; o1++ )
                {
                    for( var d2 = 0; d2 < desires2.length; d2++ )
                    {
                        if( offers1[ o1 ] == desires2[ d2 ] )
                        {
                            matches1.push( offers1[ o1 ] );
                        }
                    }
                }
                
                var matches2 = [];
                for( var o2 = 0; o2 < offers2.length; o2++ )
                {
                    for( var d1 = 0; d1 < desires1.length; d1++ )
                    {
                        if( offers2[ o2 ] == desires1[ d1 ] )
                        {
                            matches2.push( offers2[ o2 ] );
                        }
                    }
                }
                
                if( matches1.length + matches2.length >= 2 )
                {
                    trades.push({
                        trader1: request1,
                        trader2: request2,
                        tradable1: matches1,
                        tradable2: matches2
                    });
                }
            }
        }
        
        // display trades
        $( ".ikatm_trade_row" ).remove();
        for( var i = 0; i < trades.length; i++ )
        {
            var r1 = trades[ i ].trader1;
            var r2 = trades[ i ].trader2;
            var g1 = trades[ i ].tradable1;
            var g2 = trades[ i ].tradable2;
            
            var sg1 = "";
            for( var j = 0; j < g1.length; j++ )
            {
                sg1 += "<img src='";
                if( g1[ j ] == "bm" ) sg1 += woodicon;
                if( g1[ j ] == "w"  ) sg1 += wineicon;
                if( g1[ j ] == "m"  ) sg1 += marbleicon;
                if( g1[ j ] == "c"  ) sg1 += crystalicon;
                if( g1[ j ] == "s"  ) sg1 += sulphuricon;
                sg1 += "'/>";
            }
            
            var sg2 = "";
            for( var j = 0; j < g2.length; j++ )
            {
                sg2 += "<img src='";
                if( g2[ j ] == "bm" ) sg2 += woodicon;
                if( g2[ j ] == "w"  ) sg2 += wineicon;
                if( g2[ j ] == "m"  ) sg2 += marbleicon;
                if( g2[ j ] == "c"  ) sg2 += crystalicon;
                if( g2[ j ] == "s"  ) sg2 += sulphuricon;
                sg2 += "'/>";
            }
            
            var row = "<tr class='ikatm_trade_row'>";
            row += "<td style='padding: 0px 5px;'>" + r1.player + "</td>";
            row += "<td style='padding: 0px 5px;'>" + sg1 + "</td>";
            row += "<td style='padding: 0px 5px;'>&lt;---&gt;</td>";
            row += "<td style='padding: 0px 5px;'>" + sg2 + "</td>";
            row += "<td style='padding: 0px 5px;'>" + r2.player + "</td>";
            row += "</tr>";
            
            $( row ).appendTo( "#ikatm_trades_table" );
        }
    }
    
    
    ikatm_display();
    ikatm_load();
    ikatm_update();
});