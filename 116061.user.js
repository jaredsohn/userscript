// ==UserScript==
// @name        Ikariam Friends and Foes App
// @version     1.0
// @copyright   2011, Aaron Mitchell
// @license     GPLv3+ (http://www.gnu.org/copyleft/gpl.html)
// @namespace   mitchellcoding.com
// @description Allows player to select friends and foes and provides shortcut links.
// @include     http://s*.ikariam.*/*
// @exclude     http://support.ikariam.*/*
// @require     http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @history 1.0 Basic version
// ==/UserScript==

$( document ).ready( function(){
    var delete_icon = "data:image/png;base64,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%3D";

	function log( msg ){ GM_log( msg );	}

	var host = window.location.host;
    var icons = {
        "transport": "http://" + host + "/skin/actions/transport.gif",
        "station": "http://" + host + "/skin/actions/move_army.gif",
        "deploy": "http://" + host + "/skin/actions/move_fleet.gif",
        "pillage": "http://" + host + "/skin/actions/plunder.gif",
        "occupy_town": "http://" + host + "/skin/actions/occupy.gif",
        "occupy_port": "http://" + host + "/skin/actions/blockade.gif",
        "spy": "http://" + host + "/skin/actions/espionage.gif",
        "defend_town": "http://" + host + "/skin/actions/defend.gif",
        "defend_port": "http://" + host + "/skin/actions/defend_port.gif",
    }

    var urls = {
        "pillage": "/index.php?view=plunder&destinationCityId=",
        "occupy_town": "/index.php?view=occupy&destinationCityId=",
        "occupy_port": "/index.php?view=blockade&destinationCityId=",
        "spy1": "/index.php?view=sendSpy&destinationCityId=",
        "spy2": "&islandId=",
        "defend_town": "/index.php?view=defendCity&destinationCityId=",
        "defend_port": "/index.php?view=defendPort&destinationCityId=",
        "station": "/index.php?view=deployment&deploymentType=army&destinationCityId=",
        "deploy": "/index.php?view=deployment&deploymentType=fleet&destinationCityId="
    }

	var hostparts = host.split( "." );
	host = hostparts[ 0 ] + "." + hostparts[ 1 ];

	var gm_friends = "ikawar_" + host + "_friends_";
	var gm_targets = "ikawar_" + host + "_targets_";

    var friends = new Array();
    var targets = new Array();

    var saved = GM_getValue( gm_friends, "" );
    if( saved != "" )
        friends = eval( saved );

    saved = GM_getValue( gm_targets, "" );
    if( saved != "" )
        targets = eval( saved );

    //GM_setValue( gm_friends, uneval( friends ) );
    //GM_setValue( gm_targets, uneval( targets ) );

    function getQueryStringParam( key )
    {
        var href = window.location.search.substring(1);
        var parts = href.split( "&" );
        for( var i = 0; i < parts.length; i++ )
        {
            var part = parts[ i ];
            var subparts = part.split( "=" );
            if( subparts[ 0 ] == key )
                return subparts[ 1 ];
        }
        return null;
    }

	function isPage( match )
	{
		var href = window.location.search.substring(1);
		return href.indexOf( match ) >= 0;
	}


    function has_player( list, town, name )
    {
        for( var i = 0; i < list.length; i++ )
        {
            var player = list[ i ];
            if( player[ 'town' ] == town && player[ 'name' ] == name )
                return true;
        }
        return false;
    }

    if( isPage( "view=island" ) )
    {
        $( "#cities .city a" ).bind( 'click', function()
        {
            var table = $( this ).next();
            var town = $( ".name", table ).text().replace( "Name: ", "" ).replace( /\(\d+\)/g, "" );
            var name = $( ".owner", table ).text().replace( "Player: ", "" ).replace( "Send Message", "" ).replace( "Report player", "" );
            town = $.trim( town );
            name = $.trim( name );
            if( !has_player( friends, town, name ) && !has_player( targets, town, name ) )
            {
                $( "<tr class='name'><td colspan='2'><a id='ikawar_add_friend'>Add Friend</a></td><td colspan='2'><a id='ikawar_add_target'>Add Foe</a></td></tr>" ).appendTo( $( "#information .cityinfo tbody" ) );
                    var townid = $( this ).attr( "id" ).replace( "city_", "" );
                    $( "#ikawar_add_friend" ).bind( 'click', function(){
                        if( !has_player( friends, town, name ) )
                        {
                            friends.push( {
                                "town": town,
                                "name": name,
                                "townid": townid,
                                "island": getQueryStringParam( "id" )
                            } );
                            GM_setValue( gm_friends, uneval( friends ) );
                            //location.reload( true );
                            reloadTable();
                        }
                    });

                    $( "#ikawar_add_target" ).bind( 'click', function(){
                        if( !has_player( targets, town, name ) )
                        {
                            targets.push( {
                                "town": town,
                                "name": name,
                                "townid": townid,
                                "island": getQueryStringParam( "id" )
                            } );
                            GM_setValue( gm_targets, uneval( targets ) );
                            //location.reload( true );
                            reloadTable();
                        }
                    });
                } // if not friend/target
        }); // each city
    } // if Page






    function townHasUnit( town )
    {
        var found = false;
        $( ".citySelect .optionList li" ).each( function()
        {
            var name = $( this ).text().replace( /\[\d+:\d+\] +/g, "" );
            name = $.trim( name );
            if( town == name )
                found = true;
        });
        return found;
    }




	// display friends/targets
    var clazz = "";
	var div  = "<div id='ikawar_div' class='dynamic' style='z-index: 1;'>";
    var title = "";
	div += "<h3 class='header' title='" + title + "'>Friends &amp; Foes</h3>";
	div += "<div class='content'>";

    function reloadTable()
    {
        var div = "<table width='100%'>";
        for( var i = 0; i < friends.length; i++ )
        {
            var p = friends[ i ];
            clazz = "";
            title = p[ 'name' ];
            div += "<tr class='ikawar_friend'>";
            div += "  <td id='ikawar_town_" + p['townid'] + "' class='ikawar_town' title='" + title + "'>";
            div += p['town'];
            div += "  </td>";
            div += "  <td class='' title='Station Troops'><a href='" + urls[ 'station' ] + p[ 'townid' ] + "'><img class='ikawar_button' src='" + icons[ 'station' ] + "'/></a></td>";
            div += "  <td class='' title='Deploy Fleet'><a href='" + urls[ 'deploy' ] + p[ 'townid' ] + "'><img class='ikawar_button' src='" + icons[ 'deploy' ] + "'/></a></td>";
            div += "  <td class='' title='Defend Town'><a href='" + urls[ 'defend_town' ] + p[ 'townid' ] + "'><img class='ikawar_button' src='" + icons[ 'defend_town' ] + "'/></a></td>";
            div += "  <td class='' title='Defend Port'><a href='" + urls[ 'defend_port' ] + p[ 'townid' ] + "'><img class='ikawar_button' src='" + icons[ 'defend_port' ] + "'/></a></td>";
            div += "  <td class='' title='Remove'><img id='ikawar_delete_" + p[ 'townid' ] + "' class='ikawar_delete_button' src='" + delete_icon + "'/></a></td>";
            div += "</tr>";

        }
        for( var i = 0; i < targets.length; i++ )
        {
            var p = targets[ i ];
            clazz = "";
            title = p[ 'name' ];
            div += "<tr class='ikawar_target'>";
            div += "  <td id='ikawar_town_" + p['townid'] + "' class='ikawar_town' title='" + title + "'>";
            div += p[ 'town' ];
            div += "  </td>";
            div += "  <td class='' title='Pillage'><a href='" + urls[ 'pillage' ] + p[ 'townid' ] + "'><img class='ikawar_button' src='" + icons[ 'pillage' ] + "'/></a></td>";
            div += "  <td class='' title='Occupy Town'><a href='" + urls[ 'occupy_town' ] + p[ 'townid' ] + "'><img class='ikawar_button' src='" + icons[ 'occupy_town' ] + "'/></a></td>";
            div += "  <td class='' title='Occupy Port'><a href='" + urls[ 'occupy_port' ] + p[ 'townid' ] + "'><img class='ikawar_button' src='" + icons[ 'occupy_port' ] + "'/></a></td>";
            div += "  <td class='' title='Spy Town'><a href='" + urls[ 'spy1' ] + p[ 'townid' ] + urls[ 'spy2' ] + p[ 'island' ] + "'><img class='ikawar_button' src='" + icons[ 'spy' ] + "'/></a></td>";
            div += "  <td class='' title='Remove'><img id='ikawar_delete_" + p[ 'townid' ] + "' class='ikawar_delete_button' src='" + delete_icon + "'/></a></td>";
            div += "</tr>";

        }

        div += "</table>";
        $( "#ikawar_div .content" ).html( div );
    }

	div += "</div>"; // end content
	div += "<div class='footer'></div>";
	div += "</div>";
    $( div ).insertAfter( "#container2 div.dynamic:first" );
    reloadTable();

	GM_addStyle( "#ikawar_div td{ margin: 0px 5px 0px 5px; }" );
	GM_addStyle( "#ikawar_div td.ikawar_town{ font-weight: bold; }" );
	GM_addStyle( "#ikawar_div td.ikawar_town:hover{ cursor:pointer; text-decoration:underline; }" );
	GM_addStyle( "#ikawar_div .ikawar_friend{ background-color: #00FF66; }" );
	GM_addStyle( "#ikawar_div .ikawar_target{ background-color: #FFCCCC; }" );
	GM_addStyle( "#ikawar_div .ikawar_friend:hover{ background-color: #00FF33; }" );
	GM_addStyle( "#ikawar_div .ikawar_target:hover{ background-color: #FF9999; }" );
	GM_addStyle( "#ikawar_div .ikawar_delete_button{ padding: 0 1px; width: 15px; }" );
	GM_addStyle( "#ikawar_div .ikawar_delete_button:hover{ cursor:pointer; }" );
	GM_addStyle( "#ikawar_div .ikawar_button{ height: 17px; padding: 0 1px; width: 25px; }" );
	GM_addStyle( "#ikawar_add_friend{ width:50%; text-align:right; }" );
	GM_addStyle( "#ikawar_add_friend:hover{ cursor:pointer; text-decoration:underline; }" );
	GM_addStyle( "#ikawar_add_target:hover{ cursor:pointer; text-decoration:underline; }" );

	var url = 'http://' + window.location.host + '/index.php?';
	$( ".ikawar_town" ).each( function(){
		$(this).bind( 'click', function(){
			$( '#changeCityForm fieldset input' ).each( function(){
				url += $(this).attr('name') + '=' + $(this).attr('value') + '&';
			});
			var tid = $(this).attr( "id" ).replace( /ikawar_town_/, "" );
			url += 'cityId=' + tid;
			unsafeWindow.location.href = url;
		});
	});

	$( ".ikawar_delete_button" ).each( function(){
		$(this).bind( 'click', function(){
            var townid = $( this ).attr( "id" ).replace( "ikawar_delete_", "" );
            var found = false;
            for( var i = 0; i < friends.length; i++ )
            {
                var p = friends[ i ];
                if( p[ 'townid' ] == townid )
                {
                    friends.splice( i, i+1 );
                    GM_setValue( gm_friends, uneval( friends ) );
                    found = true;
                    break;
                }
            }
            if( !found )
            {
                for( var i = 0; i < targets.length; i++ )
                {
                    var p = targets[ i ];
                    if( p[ 'townid' ] == townid )
                    {
                        targets.splice( i, i+1 );
                        GM_setValue( gm_targets, uneval( targets ) );
                        found = true;
                        break;
                    }
                }
            }
            if( found )
                reloadTable();
        });
    });
});

