// ==UserScript==
// @name           ESPN Fantasy Copy Roster
// @namespace      http://glenncarr.com/greasemonkey/espn
// @description    Copy ESPN Roster to clipboard
// @include        http://games.espn.go.com/flb/*
// $LastChangedRevision: 419 $
// $LastChangedDate: 2008-03-14 00:45:43 -0500 (Fri, 14 Mar 2008) $
// ==/UserScript==
/*

Copies an ESPN roster page to the clipboard.

Example:

Batters
C Jorge Posada, NYY C
1B Carlos Pena, TB 1B
2B B.J. Upton, TB 2B, OF
3B Ryan Braun, Mil 3B
SS Stephen Drew, Ari SS
2B/SS Orlando Hudson, Ari 2B
1B/3B Mike Lowell, Bos 3B
OF Alfonso Soriano, ChC OF
OF Eric Byrnes, Ari OF
OF Torii Hunter, LAA OF
OF Hideki Matsui, NYY OF, DH
OF Rocco Baldelli, TB OF
UTIL Frank Thomas, Tor DH
Bench Yunel Escobar, Atl 2B, 3B, SS
Bench Cameron Maybin, Fla OF

Pitchers
P Scott Kazmir, TB SP
P Yovani Gallardo, Mil SP
P John Maine, NYM SP
P Trevor Hoffman, SD RP
P Todd Jones, Det RP
P Tom Gorzelanny, Pit SP
P Brandon Lyon, Ari RP
P Randy Johnson, Ari SP
P Hideki Okajima, Bos RP
Bench Tom Gordon, Phi RP

*/
(function(){

var menu = document.getElementById( 'ptfiltersmenuleft' );
if ( menu == null )
	return;

var menuButton = document.createElement( 'div' );
menuButton.setAttribute( "class", "playertablefiltersmenucontainer" );
menuButton.innerHTML = '<a href="#">Copy Roster</a>';
var a = menuButton.getElementsByTagName( 'a' )[ 0 ];
a.addEventListener( 'click', function(e) {
	e.preventDefault();
	copyRoster();
}, false );
menu.appendChild( menuButton );

String.prototype.cleanupPlayer = function() {
  return this.replace( /<span[^>]+\s+class="error"[^>]*>[^<]+<\/span>/igm, '' ).replace( /(<)/gi, ' $1').replace(/<\/?[^>]+>|&[^;]+;|^\s+|\s+$/gi, '').replace( /\s+,\s+/gi, ', ' );
}

function copyRoster()
{
	var clipText = new Array();
	for ( var tableId = 0; tableId < 2; tableId++ )
	{
		clipText.push( tableId == 0 ? 'Batters\r\n' : '\r\nPitchers\r\n' );
		var rosterTable = document.getElementById( 'playerTableTable_' + tableId );
		if ( rosterTable == null )
			break;
		//alert( hittersTable.innerHTML );
		for ( var iRow = 2; iRow < rosterTable.rows.length; iRow++ )
		{
			var row = rosterTable.rows[ iRow ];

			var playerName = row.cells[ 1 ].innerHTML.cleanupPlayer();
			if ( /^\s*empty\s*$/i.test( playerName ) )
				continue;

			clipText.push( row.cells[ 0 ].innerHTML.cleanupPlayer() );
			clipText.push( playerName );
			clipText.push( '\r\n' );
		}
	}
	var rosterText = clipText.join( '' );
	if ( copy( rosterText ) )
		alert( 'The following roster has been copied to the clipboard:\r\n\r\n' + rosterText );
}

function copy(text2copy)
{
    if (window.clipboardData)
    {
        return window.clipboardData.setData("Text",text2copy);
    }
    else
    {
        var flashcopier = 'flashcopier';
        if(!document.getElementById(flashcopier))
        {
            var divholder = document.createElement('div');
            divholder.id = flashcopier;
            document.body.appendChild(divholder);
        }
        document.getElementById(flashcopier).innerHTML = '';
        var divinfo = '<embed src="http://yahoofantasybrowsertools.googlecode.com/svn/trunk/_clipboard.swf" FlashVars="clipboard='+escape(text2copy)+'" width="0" height="0" type="application/x-shockwave-flash"></embed>';
        document.getElementById(flashcopier).innerHTML = divinfo;
    }
    return true;
}

})();
