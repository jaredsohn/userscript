// ==UserScript==
// @name           The-west Motivatie - Experienta
// @namespace      http://dikamilo.jogger.pl/
// @description    Acest script iti arata cata experienta iei in functie de motivatie.
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
        
        motivation = ( 0 + motivation.substring(0, (motivation.length - 1) ) ) / 100;

        var duel_elements = document.querySelector( "table.saloon_duel_table" ).getElementsByTagName( "tr" );
        
        for( i = 1; i < duel_elements.length; i++ )
        {
            var t = duel_elements[i].childNodes[5];
            var v = t.innerHTML;
            
            if( parseInt(v) != 0 && v.indexOf("/") == -1)
            {
                var xp = parseInt(v) * motivation;
                t.innerHTML = xp.toFixed(0)  + "/" + v;
            }
        }
    }
}