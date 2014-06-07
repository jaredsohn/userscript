// ==UserScript==
// @name           ii-HUD
// @version        4
// @namespace      http://users.pepperfish.net/vivek/
// @description    re-order the character-stats HUD
// @include        http://www.improbableisland.com/*
// @include        http://improbableisland.com/*
// ==/UserScript==

var HUD = [ "Currently Relevant" ,
            "Recent Actions"     ,
            "Vital Info"         ,
            "Personal Info"      ,
            "Game State"         ,
            "Buffs"              ,
            "Equipment Info"     ,
            "Quest"              ,
            "Global Banter"      ];

var HUD_seen  = [];
var HUD_sect  = {};
var HUD_item  = {};
var container = false;

var filter = ( // "//div[@class='infocolumn']" +
               // "/div[@class='infobox']"     +
               "//table"  +
               "/tbody/tr"                   + 
               "/td[@class='charhead']"      );

var sections = document.evaluate( filter, document, null,
                                  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                                  null );

// find a heading row (now actually a table in the new layout) for each section:
// also note the overall container of the HUD:
for( var i = 0; i < sections.snapshotLength; i++ )
{
    var th    = sections.snapshotItem( i );
    var label = th.textContent;
    var row   = th.parentNode.parentNode.parentNode; // tables used as rows

    for( var j = 0; j < HUD.length; j++ )
    {
        var key = HUD[j];

        if( label.indexOf( key ) >= 0 )
        {
            HUD_seen.push( row );
            HUD_sect[ key ] = row;
            
            if( !container )
                container = row.parentNode;

            break;
        }
    }
}

if( container )
{
    // ignore any extra furniture at the top end of the container
    var insertion_point = container.firstChild;

    while( insertion_point.nodeName == 'IMG'  ||
           insertion_point.nodeName == '#text' )
        insertion_point = insertion_point.nextSibling;

    // harvest the rows for each section, cache by section label:
    for( var key in HUD_sect )
    {
        var th = HUD_sect[ key ]; // table containing the heading and ± control

        HUD_item[ key ] = [ th ];

        // now pick up following nodes until we encounter a node we have
        // already cached (pre-cached nodes are headings, nodes in
        // between this node and the next pre-cached node are the data
        // entries in this section, like so:
        // • this section ← cached
        // • data item 0
        // • data item 1
        // ⋮
        // • next section ← cached
        for( var node = th.nextSibling; node; node = node.nextSibling )
        {
            // only 'table' elements are interesting for our purposes
            // here, otherwise in some skins we accidentally pick up
            // the donations section and move it around:
            if( node.nodeName != 'TABLE'      ) continue;
            if( HUD_seen.indexOf( node ) >= 0 ) break;

            HUD_item[ key ].push( node );
        }
    }

    // remove and reinsert the cached section rows in the required order:
    // (we walk the lists backwards because there's no "prependchild", only
    // insert-before-node, and of course insertion can change what the
    // relevant node is):
    for( var i = HUD.length - 1; i >= 0; i-- )
    {
        var label   = HUD[ i ];
        var section = HUD_item[ label ];

        if( section )
        {
            for( j = section.length - 1; j >= 0; j-- )
            {
                var moved = container.removeChild( section[ j ] );
                container.insertBefore( moved, insertion_point );
                insertion_point = moved;
            }
        }
    }
}
