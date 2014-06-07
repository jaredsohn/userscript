// ==UserScript==
// @name        Hobo Battle Page Updates
// @version     1.1
// @copyright   2010, Aaron Mitchell
// @license     GPLv3+ (http://www.gnu.org/copyleft/gpl.html)
// @namespace   mitchellcoding.com
// @description When listing hobos to attack, display your current level instead of 3 levels lower.  Add links to easily switch between levels.
// @include     http://www.hobowars.com/*cmd=battle
// @include     http://www.hobowars.com/*cmd=battle&do=list&l_level=*
// @exclude     http://support.hobowars.*/*
// @require     http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==

$( document ).ready( function(){
		$( "<div id='mylog' style='color: black'></div>" ).appendTo( "#wrapper" );
		function log( msg )
		{
			$( "#mylog" ).append( msg + "<br/>" );
		}

		function getLevel( from )
		{
			var lvl = undefined;
			var matches = /.*l_level=(\d+)&.*/.exec( from );
			if( matches )
			{
				var lvl = parseInt( matches[ 1 ] );
			}
			return lvl;
		}

		function getSR( from )
		{
			var sr = undefined;
			var matches = /.*sr=(\d+)&.*/.exec( from );
			if( matches )
			{
				var sr = matches[ 1 ];
			}
			return sr;
		}

		// update link on Battle page
		var link = $( "#container div.tabpage i a[href]" ).eq( 0 );
		if( link )
		{
			var hpath = link.attr( "href" );
			if( hpath )
			{
				var level = getLevel( hpath );
				hpath = hpath.replace( "l_level="+level, "l_level="+(level+3) );
				link.attr( "href", hpath );
			}
		}

		// update all links on Battle List page
		var tables = $( "#container div.tabpage table" );
		if( tables )
		{
			var row = $( "tr", tables.eq( 1 ) ).eq( 0 );
			if( row )
			{
				var level = getLevel( window.location.href );
				var sr = getSR( window.location.href );
				var center = $( "center", row );

				var contents = "&lt;&lt; ";
				contents += "<a href='game.php?sr=" + sr + "&cmd=battle&do=list&l_level=" + (level-6) + "&l_life=1'>Previous 6 levels</a>";
				contents += " | ";
				contents += "<a href='game.php?sr=" + sr + "&cmd=battle&do=list&l_level=" + (level-1) + "&l_life=1'>Previous 1 level</a>";
				contents += " | ";
				contents += "<a href='game.php?sr=" + sr + "&cmd=battle&do=list&l_level=" + (level+1) + "&l_life=1'>Next 1 level</a>";
				contents += " | ";
				contents += "<a href='game.php?sr=" + sr + "&cmd=battle&do=list&l_level=" + (level+6) + "&l_life=1'>Next 6 levels</a>";
				contents += " &gt;&gt;";
				center.html( contents );

				contents += "<br><br>[<a href='game.php?sr=" + sr + "&cmd=battle'>Back</a>]";
				var nextcenter = $( "#container div.tabpage center" ).eq( 2 );
				nextcenter.html( contents );
			}
		}
});

