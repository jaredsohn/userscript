// ==UserScript==
// @name           ii-timed-fighting
// @namespace      http://users.pepperfish.net/vivek/ii/
// @description    Improbable Island Timed Fighting Countdown Hack
// @include        http://www.improbableisland.com/*
// @include        http://improbableisland.com/*
// ==/UserScript==

var timer  = null;
// this _should_ find the 'X seconds' bold node that holds the timer target:
var filter = "//div[@id='combatbars']/following-sibling::*/tbody/tr/td/b";
var nodes  = document.evaluate( filter, document, null,
                                XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                                null );
var done   = false;
// GM_log( "nodes[" + nodes.snapshotLength() + "] found" );

for( var x = 0; x < nodes.snapshotLength && !done; x++ )
{
    var node = nodes.snapshotItem(x);
    var text = node.textContent;
    var time = null;

    if( time = text.match(/([0-9]+) seconds/) )
    {
        var target   = time[1];
        var max      = target;

        // hack up the interval so we actually count down
        // to the target time minus ≃ 0.4 seconds to allow
        // for reaction time, lag and mind control rays:
        var interval = ( (max * 1000) - 400 ) / max;

        // just in case we want to grab this node later
        node.setAttribute("id", "ii-target-time");

        function tock ()
        {
            var label = ' seconds';
            target -= 1;

            if( target < 0   ) { target = max;       }
            if( target == 1  ) { label  = ' second'; }

            node.textContent = target + label;
        }

        function tick () { tock(); }
        setInterval( tick, interval );
        done = true;
    }
}
