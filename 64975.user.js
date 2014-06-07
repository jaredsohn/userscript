// ==UserScript==
// @name           The-west Motivation Exp
// @namespace      http://dikamilo.jogger.pl/
// @description    This small easy script shows how many exp you got including motivation.
// @include        http://*.the-west.*
// @include        http://zz1w1.tw.innogames.net/game.php*
// @exclude        http://www.the-west.*
// @exclude        http://forum.the-west.*
// ==/UserScript==

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
                duel_elements[ i ].childNodes[5].innerHTML += " ( " + xp.toFixed(0)  + " )";
            }
        }
    }
}