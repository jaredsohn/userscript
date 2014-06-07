// ==UserScript==
// @name        Ikariam Alliance Forum
// @version     1.0
// @copyright   2011, Aaron Mitchell
// @license     GPLv3+ (http://www.gnu.org/copyleft/gpl.html)
// @namespace   mitchellcoding.com
// @description Displays a forum in an inline iframe
// @include     http://s*.ikariam.*/*
// @exclude     http://support.ikariam.*/*
// @require     http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @history 1.0 Basic version with minor updates
// ==/UserScript==


// Display the forum in an iframe

$( document ).ready( function(){
	function log( msg )
	{
		GM_log( msg );
	}

    //var defUrl = "http://ikariam-naa.proboards.com/index.cgi";
    var defUrl = "http://us.gameforge.com/messages/index";

	var host = window.location.host;
	var hostparts = host.split( "." );
	host = hostparts[ 0 ] + "." + hostparts[ 1 ];
	var gm_url = "ikaforum_" + host + "_url";

    var url = GM_getValue( gm_url, defUrl );

    var div = "<div id='allyforum' class='dynamic' style='z-index: 1;'>";
    div += "<h3 class='header'>Alliance Forum</h3>";
    div += "<div class='content'>";
    // TODO display some useful data regarding new posts
    div += "<div class='centerButton'><a id='ikaforum_open' class='button' type='button'>Open Forum</a></div>";
    div += "</div>";
    div += "<div class='footer'></div>";
    div += "</div>";

    $( div ).insertBefore( '#container2 div.dynamic:first' );

    
    $( '#ikaforum_open' ).click( function(){
        var iframe = "<iframe src='" + url + "' width='100%' height='600'>";
        iframe += "<p>Your browser does not support iframes</p>";
        iframe += "</iframe>";
        $( "#mainview" ).html( iframe );
        $( "#breadcrumbs" ).remove();
    });


    function isPage( match )
    {
        var href = window.location.search.substring(1);
        return href.indexOf( match ) >= 0;
    }

    // Options page
    if( isPage( "view=options" ) && isPage( "page=game" ) )
    {
        var url = GM_getValue( gm_url, defUrl );
        var div = "";
        div += "<div class='contentBox01h'>";
        div += "  <h3 class='header'>Alliance Forum</h3>";
        div += "  <div class='content'>";
        div += "      <table cellspacing='0' cellpadding='0'>";
        div += "        <tr>";
        div += "          <th>Forum URL</th>";
        div += "          <td><input id='ikaforum_url_input' type='text' style='width: 250px;' value='" + url + "'/></td>";
        div += "        </tr>";
        div += "        <tr>";
        div += "          <td colspan='2'><center><input id='ikaforum_save' type='button' class='button' value='Save Settings'/></center></td>";
        div += "        </tr>";
        div += "      </table>";
        div += "    <div id='ikaforum_settings_display'></div>";
        div += "  </div>";
        div += "  <div class='footer'></div>";
        div += "</div>";
        $( div ).insertBefore( "#vacationMode" );
        $( "#ikaforum_save" ).click( function(){
            var value = $("#ikaforum_url_input").attr( "value" );
            GM_setValue( gm_url, value );
            $( "#ikaforum_settings_display" ).html( "<center>Settings Saved</center>" );
        });
    }
});
