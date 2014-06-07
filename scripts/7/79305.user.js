// ==UserScript==
// @name           The West_-_Duel Exp
// @description    Montre l experience gagne lors des duel.
// @namespace      http://ryuuku.olympe-network.com/
// @include        http://*.the-west.*
// @exclude        http://ryuuku.olympe-network.com/
// @version        1.27
// @author         Hack.Crows
// @copyright      Hack.Crows/ryuuku
// ==/UserScript==

// Modified by Hack.Crows

document.getElementById( "windows" ).addEventListener( "DOMNodeInserted", nodeInserted, false );

function nodeInserted( event )
{
    if ( document.querySelector( 'div.saloon_duel_layer' ) ) 
	{
        var motivation = document.querySelector( "div.bar_perc" ).innerHTML;
        
        motivation =  ( 0 + motivation.substring(0, (motivation.length - 1) ) ) / 100;

        var duel_elements = document.querySelector( "table.saloon_duel_table" ).getElementsByTagName( "tr" );
        
        for( i = 1; i < duel_elements.length; i++ )
        {
            var exp = duel_elements[ i ].childNodes[5].innerHTML;
            
            if( exp.length <= 5 )
            {
                var xp = (0 + exp) * motivation;
                duel_elements[ i ].childNodes[5].innerHTML += " (" + xp.toFixed(0)  + ")";
            }
        }
    }
}