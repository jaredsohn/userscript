// ==UserScript==
// @name           ii-nutritional-value
// @namespace      http://users.pepperfish.net/vivek/ii/
// @description    Improbable Island Butchery Guide (remembers nutritional values)
// @include        http://www.improbableisland.com/*
// @include        http://improbableisland.com/*
// ==/UserScript==

var done   = false;
var sieve  = "//div[@class='maincolumn']/h2/parent::*" + "|" +
             "//td[@class='content']/h2/parent::*"     + "|" +
             "//fieldset/legend/parent::*/div[@class='block']";
var filter = "//div[@class='navbox']/a[@class='nav']"    + "|" +
             "//td[@class='navigation']/a[@class='nav']" + "|" +
             "//td[@class='nav']/a[@class='nav']";
var nodes  = document.evaluate( filter, document, null,
                                XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                                null );
var corpse = null; 

if( corpse = sessionStorage.getItem('ii/food/last-carcass') )
{
    var a = 0;
    var b = 0;
    var c = 0;
    var label = "";
    var butchery = document.evaluate( sieve, document, null,
                                      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                                      null );

    sessionStorage.removeItem('ii/food/last-carcass');

    for( var i = 0; i < butchery.snapshotLength; i++ )
    {
        var raw = butchery.snapshotItem(i).textContent;
        var got = null;

        // GM_log( "processing raw text: " + 
        //         butchery.snapshotItem(i) + " : " + raw );

        if( got = raw.match("You tear off enough to make ([0-9]+) rough bite") )
        {
            a += got[1] * 1;
        }

        if( got = raw.match("the fattier muscle, and before too long "+ 
                            "you have ([0-9]+) rough bite") )
        {
            b += got[1] * 1;
        }

        if( got = raw.match("slide easily from the bone, and you " + 
                            "wind up with ([0-9]+) rough bite") )
        {
            c += got[1] * 1;
        }
    }

    // only log the value if we successfully parsed at least one category:
    if( (a > 0) || (b > 0) || (c > 0) )
    {
        label = "(" + a + ", " + b + ", " + c + ")";
        localStorage.setItem( corpse, label );
        // GM_log( "storing " + corpse + " value : " + label );
        done = true;
    }
}

for( var x = 0; x < nodes.snapshotLength; x++ )
{
    var node = nodes.snapshotItem(x);
    var text = node.textContent;
    var what = null;

    if( what = text.match("Clean\\s+the\\s+carcass\\s+of\\s+(.*?)\\s+\\(") )
    {
        var target = what[1];
        var key    = 'ii/food/' + target;
        var value  = localStorage.getItem(key);

        // GM_log( "cached value(s) for '" + target + "'" );

        // duff stored value 
        if( value == "(0, 0, 0)" ) 
        { 
            done = false; 
            value = null;
            localStorage.removeItem( key );
        }

        if( !done ) { sessionStorage.setItem('ii/food/last-carcass', key); }

        // GM_log( "looking up '" + key + "'");
        if( value )
        {
            // GM_log( target + " == " + value );
            node.setAttribute( "title", value );
        }
        else
        {
            // GM_log( key + " == null" );
            node.setAttribute( "title", "(?, ?, ?)" );
        }
    }
}
