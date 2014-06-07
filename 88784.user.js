// ==UserScript==
// @name        Legatus Helper
// @version     1.5
// @copyright   2010, Aaron Mitchell
// @license     GPLv3+ (http://www.gnu.org/copyleft/gpl.html)
// @namespace   mitchellcoding.com
// @description Enables helpful features for Legatus in NAA
// @include     http://s*.ikariam.*/index.php*
// @exclude     http://support.ikariam.*/*
// @require     http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==

// Helpful features for Legatus in NAA
// * Each legatus is responsible for putting one spearman in each town in their
//   region.
//   * Allow the input of coordinates that define the region
//   * Allow setting to certains to ignore (opt-out)
//   * Look for member towns in the region (and opt-in)
//   * If the town in not in the town dropdown, place a button in the alliance page table
//     to send 1 spearman to that town (if spearman and ship available).
//     * Button to send to all towns ?
//   * ? tell when player comes back from inactive ?
// * Add a settings tab to the Alliance page
//   * Region name
//   * Bounds: list of coordinates
//   * Ignore: Towns not within borders, but ignored


// Pre-determined coordinates:
// Southern Aquila: 0:25,0:50,41:50,41:25,0:25
// Northern Aquila: 0:0,0:24,44:24,45:0,0:0
// Capricornus:     45:0,45:45,75:45,75:0,45:0
// Taurus:          45:0,45:42,55:42,55:47,75:47,75:0,45:0

$( document ).ready( function(){
		function log( msg ){ GM_log( msg );	}

		function ascii( str )
		{
			var s = "";
			for( var i = 0; i < str.length; i++ )
				s += str.charCodeAt( i ) + " "; 
			return s;
		}

        function isPage( match )
        {
            var href = window.location.search.substring(1);
            return href.indexOf( match ) >= 0;
        }

        // All pages logic
        // put dynamic box in side panel
        var seq = GM_getValue( "legatus_" + window.location.host + "_sequence", "" );
        if( seq != "" )
        {
            var parts = seq.split( ";" );
            var div = "<div id='legatus_dyn_div' class='dynamic' style='z-index: 1;'>";
            div += "<h3 class='header' title='Legatus Helper'>Legatus Helper</h3>";
            div += "<div class='content'>";
            div += "<center><a id='send_next_seq' class='button' title='Send next unit'>Send Next (" + parts.length + ")</a></center>";
            div += "</div>";
            div += "<div class='footer'></div>";
            div += "</div>";
            $( div ).insertAfter( "#container2 div.dynamic:first" );
		    $( "#send_next_seq" ).click( function()
		    {
                var seq = GM_getValue( "legatus_" + window.location.host + "_sequence", "" );
                if( seq != "" )
                {
                    var parts = seq.split( ";" );
                    var nextpart = parts.shift();
                    GM_setValue( "legatus_" + window.location.host + "_sequence", parts.join( ";" ) );
                    window.location = nextpart;
                }
            });
        }


        if( !isPage( "listAllyMembers" ) )
            return;

        // listAllyMembers logic only

		GM_addStyle( "div.diplomacyAdvistorTabs table#legatus_tabz{ margin-top: 5px; width: 100% }" );
		GM_addStyle( "div.diplomacyAdvistorTabs table#legatus_tabz td{ text-align: center; width: 50% }" );
		GM_addStyle( "div.diplomacyAdvistorTabs #legatus_tabz td a{ color: #542C0F; display: block; margin: 0 auto; padding: 5px 0 10px; }" );
		GM_addStyle( "div.diplomacyAdvistorTabs #legatus_tabz td.selected a, div.diplomacyAdvisorTabs #legatus_tabz td a:hover{ background: url('layout/bg_tabs_diplomacy_single2.jpg') no-repeat scroll center -5px transparent; }" );

		var lis = $( "#changeCityForm ul li div.citySelect ul.optionList li" );
		var towns = new Array();
		for( var i = 0; i < lis.length; i++ )
		{
			var txt = $( lis[ i ] ).text();
			var index = txt.indexOf( "]", 1 );
			txt = txt.substring( index + 2 );
			towns.push( txt );
		}


		var members = $( "#memberList tbody tr" );
		var allianceMembers = new Array();
		for( var i = 0; i < members.length; i++ )
		{
			var cityinfo = $( "td.cityInfo", members[ i ] );
			var player = {};
			player.name = cityinfo.prev().text();
			if( player.name == "" ) continue;
            player.vacation = cityinfo.prev().prev().attr( 'class' ) == 'vacation';
			player.towns = new Array();
			var lis = $( "li ul li", cityinfo );
			for( var j = 0; j < lis.length; j++ )
			{
				var t = {};
				var a = $( "a", lis[ j ] );
				t.longname = a.text();
				var matches = /([a-zA-Z0-9_\- ]+)\s+\[(\d+):(\d+)\]/.exec( t.longname );
				t.name = matches[ 1 ].replace( /\s$/, "" );
				t.x = parseInt( matches[ 2 ] );
				t.y = parseInt( matches[ 3 ] );
				// ?view=island&id=2158&selectCity=195532
				t.href = a.attr( "href" );
				var split = t.href.split( "&" );
				t.href = split[ 2 ];
				var cityCode = t.href.split( "=" )[ 1 ];
			// ?view=deployment&deploymentType=army&destinationCityId=228176
				t.href = "?view=deployment&deploymentType=army&destinationCityId=" + cityCode;
				player.towns.push( t );
			}
			// the next column is rank
			player.rank = cityinfo.next().text();
			allianceMembers.push( player );
		}
		var tabs = "<div class='diplomacyAdvisorTabs'>\
		<table id='legatus_tabz' cellspacing='0' cellpadding='0'>\
		<tr>\
		<td class='selected' id='view_memberlist_td'>\
		<a title='Member List' href='?view=diplomacyAdvisorAlly&listAllyMembers=1'><em>Member List</em></a>\
		</td>\
		<td id='view_legatus_td'>\
		<a title='Legatus' id='view_legatus'><em>Legatus</em></a>\
		</td>\
		</tr>\
		</table>\
		</div>";

		// get the second div
		var div = $( "#mainview div.contentBox01h" ).eq( 0 );
		var header = $( "h3.header", div );
		header.attr( "id", "dipAllyHeader" );
		header.html( tabs );

		var content = header.next();
		content.attr( "id", "dipAllyContent" );

		var legatus_link = $( "#view_legatus" );
		legatus_link.mouseover( function(){ document.body.style.cursor='pointer' } );
		legatus_link.mouseleave( function(){ document.body.style.cursor='auto' } );
		legatus_link.click( function()
		{
			$( "#view_legatus_td" ).addClass( "selected" );
			$( "#view_memberlist_td" ).removeClass( "selected" );

			var ignores = GM_getValue( "legatus_" + window.location.host + "_ignore", "" );
			if( ignores != "" )
				ignores = ignores.split( "," );
			else
				ignores = new Array();

			var regionname = GM_getValue( "legatus_" + window.location.host + "_region", "" );
			var regioncoords = GM_getValue( "legatus_" + window.location.host + "_coords", "" );
			coords = new Array();
			if( regioncoords != "" )
			{
				coordlist = regioncoords.split( "," );
				for( var i = 0; i < coordlist.length; i++ )
				{
					var matches = /(\d+):(\d+)/.exec( coordlist[ i ] );
					var x = matches[ 1 ];
					var y = matches[ 2 ];
					c = {};
					c.x = parseInt( x );
					c.y = parseInt( y );
					coords.push( c );
				}
			}

			var regionexcludes = GM_getValue( "legatus_" + window.location.host + "_exclude", "" );
			excludes = new Array();
			if( regionexcludes != "" )
			{
				excludeslist = regionexcludes.split( "," );
				for( var i = 0; i < excludeslist.length; i++ )
				{
					var matches = /\s*(\d+):(\d+)\s*/.exec( excludeslist[ i ] );
					c = {};
					c.x = parseInt( matches[ 1 ] );
					c.y = parseInt( matches[ 2 ] );
					excludes.push( c );
				}
			}

			var ignoreList = GM_getValue( "legatus_" + window.location.host + "_ignore", "" );
			if( ignoreList != "" )
				ignoreList = ignoreList.split( "," );
			else
				ignoreList = new Array();




			function inRegion( pt, poly )
			{
				var xp = new Array(), yp = new Array();
				for( var i = 0; i < poly.length; i++ )
				{
					xp.push( poly[ i ].x );
					yp.push( poly[ i ].y );
				}
				var x = pt.x;
				var y = pt.y;
				var i, j, c = 0, npol = xp.length; 
				for (i = 0, j = npol-1; i < npol; j = i++) { 
					if ((((yp[i] <= y) && (y < yp[j])) ||
						((yp[j] <= y) && (y < yp[i]))) && 
						(x < (xp[j] - xp[i]) * (y - yp[i]) / (yp[j] - yp[i]) + xp[i])) { 
						c =!c; 
					} 
				} 
				return c; 
			}

			function isExcluded( pt, rexcludes )
			{
				for( var i = 0; i < rexcludes.length; i++ )
				{
					if( rexcludes[ i ].x = pt.x && rexcludes[ i ].y == pt.y )
					{
						return true;
					}
				}
				return false;
			}

			function isIgnored( key, list )
			{
				for( var i = 0; i < list.length; i++ )
				{
					if( list[ i ] == key )
						return true;
				}
				return false;
			}

			function inTownList( name, list )
			{
				for( var i = 0; i < list.length; i++ )
				{
					if( name == list[ i ] )
					{
						return true;
					}
				}
				return false;
			}

            // get preset options
            var presetCoords = new Array();
            var presetoptions = "";
			var presets = GM_getValue( "legatus_" + window.location.host + "_preset", "" ); // name|coords,name|coords,...
            if( presets != "" )
            {
                var csplit = presets.split( ";" );
                for( var i = 0; i < csplit.length; ++i )
                {
                    var psplit = csplit[ i ].split( "|" );
                    var pname = psplit[ 0 ];
                    var pcoords = psplit[ 1 ];
                    presetCoords[ pname ] = pcoords;
                    presetoptions += "<option value='" + pname + "'>" + pname + "</option>";
                }
            }
            else
            {
                presetCoords[ "Northern Aquila" ] = "0:0,0:26,44:26,44:0,0:0";
                presetCoords[ "Southern Aquila" ] = "0:26,0:51,39:51,39:30,44:30,44:26,0:26";
                presetCoords[ "Capricornus" ] = "45:0,45:46,75:46,75:0,45:0";
                presetCoords[ "Taurus" ] = "40:41,40:52,30:52,30:61,75:61,75:47,44:47,44:41,40:41";
                presetCoords[ "Leo" ] = "0:62,75:62,75:101,0:101,0:62";
                presetCoords[ "Statio" ] = "75:0,75:101,101:101,100:0,75:0";

                var pnames = new Array( "Northern Aquila", "Southern Aquila", "Capricornus", "Taurus", "Leo", "Statio" );

                var savestr = "";
                for( var i = 0; i < pnames.length; i++ )
                {
                    presetoptions += "<option value='" + (pnames[ i ]) + "'>" + (pnames[ i ]) + "</option>";
                    if( i > 0 )
                        savestr += ";";
                    savestr += pnames[ i ] + "|" + presetCoords[pnames[i]];
                }
			    GM_setValue( "legatus_" + window.location.host + "_preset", savestr );
            }


			var content = "";
			content += "<div class='content'>";
			content += "  <table width='100%'>";
            content += "    <tr>";
			content += "      <td colspan='2'>Preset Regions";
            content += "      <select id='legatus_preset_names'>" + presetoptions + "</select><input type='button' class='button' id='legatus_preset_load' value='Load'/></td>";
            content += "    </tr>";
			content += "    <tr>";
			content += "      <td>Region</td>";
			content += "      <td><input type='text' id='region_name' value='" + regionname + "' title='Region Name'/></td>";
			content += "    </tr>";
			content += "    <tr>";
			content += "      <td>Bounds</td>";
			content += "      <td><input type='text' id='region_coords' value='" + regioncoords + "' title='Region coordinates (ie. x:y,x:y,...)'/></td>";
			content += "    </tr>";
			content += "    <tr>";
			content += "      <td>Excludes</td>";
			content += "      <td><input type='text' id='region_excludes' value='" + regionexcludes + "' title='Exclude these coordinates (ie. x:y,x:y,...)'/></td>";
			content += "    </tr>";
			content += "    <tr>";
			content += "      <td colspan='3' align='left'>";
			content += "        <div class='centerButton'>";
			content += "          <a id='save_region' class='button' title='Save region settings'>Save</a>";
			content += "        </div>";
			content += "      </td>";
			content += "    </tr>";
			content += "    <tr>";
			content += "      <td colspan='3'>";
			content += "        <center><span id='save_region_status'><br/></span></center>";
			content += "      </td>";
			content += "    </tr>";
			content += "  </table>";
			content += "  <br/>";
			content += "  <table width='100%'>";
			content += "    <tr>";
			content += "      <th>Player</th>";
			content += "      <th>Town</th>";
			content += "      <th>State</th>";
			content += "      <th>Ignore</th>";
			content += "      <th><input type='checkbox' id='cbSelectAll'/></th>";
			content += "    </tr>";
			for( var i = 0; i < allianceMembers.length; i++ )
			{
				for( var j = 0; j < allianceMembers[ i ].towns.length; j++ )
				{
					var member = allianceMembers[ i ];
					var town = member.towns[ j ];
					if( inRegion( town, coords ) && !isExcluded( town, excludes ) )
					{
						content += "<tr>";
						content += "<td>" + member.name + "</td>";
						content += "<td>" + town.longname + "</td>";
						var key = member.name + "|" + town.name;
						if( !isIgnored( key, ignoreList ) )
						{
                            var deployed = inTownList( town.name, towns );
							if( deployed )
								content += "<td><center>Deployed</center></td>";
                            else if( member.vacation )
								content += "<td><center>Vacation</center></td>";
							else
							{
								var id = "deploy_" + member.name + "_" + town.name;
								content += "<td><center><a id='"+id+"' href='" + town.href + "'>Deploy</a></center></td>";
							}
							var id = "ignore_" + member.name + "_" + town.name;
							content += "<td><center><a id='"+id+"'>Ignore</a></center></td>";
                            if( !deployed && !member.vacation )
                                content += "<td><center><input type='checkbox' id='lcb_" + town.href + "'/></center></td>";
						}
						else
						{
							content += "<td><center>Ignored</center></td>";
							var id = "unignore_" + member.name + "_"+town.name;
							content += "<td><center><a id='"+id+"'>Unignore</a></center></td>";
                            content += "<td></td>";
						}
						content += "</tr>";
					} // if inRegion
				} // end for
			} // end for
            content += "    <tr>";
            content += "        <td></td><td></td><td></td><td></td>";
			content += "          <td><a id='save_seq' class='button' title='Save region settings'>Save</a></td>";
            content += "    </tr>";
			content += "  </table>";
			content += "  <center><span id='save_seq_status'><br/></span></center>";
			content += "</div>";
			$( "#dipAllyContent" ).html( content );

            $( "#legatus_preset_load" ).click( function(){
                var selected = $( "#legatus_preset_names option:selected" ).val();
                var coords = presetCoords[ selected ];
                if( coords )
                {
                    $( "#region_name" ).attr( "value", selected );
                    $( "#region_coords" ).attr( "value", coords );
                }
            });

			$( "#save_region" ).click( function()
			{
				var name    = $( "#region_name" ).attr( "value" );
				var coords  = $( "#region_coords" ).attr( "value" );
				var exclude = $( "#region_excludes" ).attr( "value" );
				GM_setValue( "legatus_" + window.location.host + "_exclude", 
							 exclude );
				GM_setValue( "legatus_" + window.location.host + "_region", 
							 name );
				GM_setValue( "legatus_" + window.location.host + "_coords", 
							  coords );
				$( "#save_region_status" ).html( "<b>Settings Saved (Refreshing...)</b>" );
                window.location = "?view=diplomacyAdvisorAlly&listAllyMembers=1";
			});

			$( "#save_seq" ).click( function()
			{
                var seq = new Array();
				$( "input[id^='lcb_']:checked" ).each( function(){
                    var href = $(this).attr( "id" ).split( "_" )[ 1 ];
                    seq.push( href );
                });
				GM_setValue( "legatus_" + window.location.host + "_sequence", 
							 seq.join( ";" ) );
				$( "#save_seq_status" ).html( "<b>Sequence Saved</b>" );
                window.location = "?view=diplomacyAdvisorAlly&listAllyMembers=1";
			});


			$( "#cbSelectAll" ).click( function()
            {
                var val = this.checked? "checked": "";
                $( "input[id^='lcb_']:checkbox" ).attr( "checked", val );
            });

			function deploy( element )
			{
				var me = $( element );
				var id = me.attr( "id" );
				var split = id.split( "_" );
				var player = split[ 1 ];
				var town = split[ 2 ];
				// find alliance member
				for( var i = 0; i < allianceMembers.length; i++ )
				{
					var member = allianceMembers[ i ];
					if( member.name == player )
					{
						for( var j = 0; j < member.towns.length; j++ )
						{
							if( member.towns[ j ].name == town )
							{
								var url = member.towns[ j ].href;
								$( "<a id='deploy_now' href='" + url + "'/>" ).appendTo( "body" );
								$( "#deploy_now" ).click();
							}
						}
					}
				}
			}

			function ignore( element )
			{
				var me = $( element );
				var id = me.attr( "id" );
				var split = id.split( "_" );
				var player = split[ 1 ];
				var town = split[ 2 ];
				var key = player + "|" + town;
				var ignoreList = GM_getValue( "legatus_" + window.location.host + "_ignore", "" );
				if( ignoreList != "" )
					ignoreList += ",";
				ignoreList += key;
				GM_setValue( "legatus_" + window.location.host + "_ignore", ignoreList );
				var newid = "unignore_" + player + "_" + town;
				me.attr( "id", newid );
				me.text( "Unignore" );
				me.click( function(){ unignore( this ) } );
				var deployed = $( "#deploy_" + player + "_" + town );
				deployed.parent().html( "Ignored" );
			}

			function unignore( element )
			{
				var me = $( element );
				var id = me.attr( "id" );
				var split = id.split( "_" );
				var player = split[ 1 ];
				var town = split[ 2 ];
				var key = player + "|" + town;
				var ignoreList = GM_getValue( "legatus_" + window.location.host + "_ignore", "" );
				ignoreList = ignoreList.split( "," );
				// remove key from ignore list
				ignoreList = jQuery.grep( ignoreList, function(value){
					return value != key;
				});
				ignoreList = ignoreList.join( "," );
				GM_setValue( "legatus_" + window.location.host + "_ignore", ignoreList );
				var newid = "ignore_" + player + "_" + town;
				me.attr( "id", newid );
				me.text( "Ignore" );
				me.click( function(){ ignore( this ) } );

				var url = "";
				for( var i = 0; i < allianceMembers.length && url == ""; i++ )
				{
					var member = allianceMembers[ i ];
					for( var j = 0; j < member.towns.length && url == ""; j++ )
					{
						var t = member.towns[ j ];
						if( t.name == town )
						{
							url = t.href;
						}
					}
				}
				var col = me.parent().prev();
				key = "deploy_" + player + "_" + town;
				col.html( "<a id='" + key + "' href='" + url + "'>Deploy</a>" );
				$( "#" + key ).mouseover( function(){ document.body.style.cursor='pointer' } );
				$( "#" + key ).mouseleave( function(){ document.body.style.cursor='auto' } );
			}

			$( "a[id^=deploy]" ).mouseover( function(){ document.body.style.cursor='pointer' } );
			$( "a[id^=deploy]" ).mouseleave( function(){ document.body.style.cursor='auto' } );
			//$( "a[id^=deploy]" ).click( function(){ deploy( this ) } );


			$( "a[id^=ignore]" ).mouseover( function(){ document.body.style.cursor='pointer' } );
			$( "a[id^=ignore]" ).mouseleave( function(){ document.body.style.cursor='auto' } );
			$( "a[id^=ignore]" ).click( function(){ ignore( this ); } );


			$( "a[id^=unignore]" ).mouseover( function(){ document.body.style.cursor='pointer' } );
			$( "a[id^=unignore]" ).mouseleave( function(){ document.body.style.cursor='auto' } );
			$( "a[id^=unignore]" ).click( function(){ unignore( this ); } );
		});
});

