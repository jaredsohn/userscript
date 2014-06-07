// ==UserScript==
// @name           ii-rally
// @namespace      http://users.pepperfish.net/vivek/ii/
// @description    Reads the "points to visit" page and annotates your mini map and world map with the rally points
// @include        http://www.improbableisland.com/runmodule.php?module=hundredpointrally&op=showpoints*
// @include        http://www.improbableisland.com/runmodule.php?module=worldmapen*
// @include        http://improbableisland.com/runmodule.php?module=hundredpointrally&op=showpoints*
// @include        http://improbableisland.com/runmodule.php?module=worldmapen*
// @version        4
// ==/UserScript==

var label_colour = '#ff1f1f';

function read_route ()
{
    var done   = "//del/span";
    var column = [ "//tr[@class='sitecenter']/td/table/tbody/tr/td",
                   "//body/table/tbody/tr/td" ];
    var seen   = document.evaluate( done, document, null, 
                                    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                                    null );
    var nodes     = null; 
    var ordered   = [];
    var unordered = [];
    var visited   = {};

    for( var i = 0; i < column.length; i++ )
    {
        //GM_log( 'checking nodes @ ' + column[i] );
        if( nodes = document.evaluate( column[i], document, null,
                                       XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                                       null ) )
            {
                if( nodes && nodes.snapshotLength > 0 )
                    break;
            }
    }

    for( var i = 0; i < seen.snapshotLength; i++ )
    {
        var node = seen.snapshotItem( i );
        var text = node.textContent;
        var match = false;

        if( match = text.match( /.*?([0-9]+),([0-9]+)/ ) )
        {
            var x   = (match[1] * 1);
            var y   = (match[2] * 1);
            var key = x + ',' + y;
            visited[ key ] = true;
        }
    }

    //GM_log( 'visited: ' + JSON.stringify(visited) );

    for( var i = 0; i < nodes.snapshotLength; i++ )
    {
        var payload = nodes.snapshotItem(i).textContent;

        if( payload.match(/Sequenced Points/) )
        {
            var re = /^.*?Point ([0-9]+): ([0-9]+),([0-9]+)/my;
            while( match = re.exec(payload) )
            {
                var nth = (match[1] * 1) - 1;
                var x   = (match[2] * 1) + 0;
                var y   = (match[3] * 1) + 0;
                var key = x + ',' + y;

                if( !visited[key] )
                    ordered[ nth ] = [ x, y ];
            }

            var stored = JSON.stringify( ordered );
            localStorage.setItem( 'ii/rally/ordered', stored );
            //GM_log( stored );
        }
        else if ( payload.match(/Unordered Points/) )
        {
            var re  = /([0-9]+),([0-9]+)/my;
            var nth = 0;
            
            while( match = re.exec(payload) )
            {
                var x   = (match[1] * 1) + 0;
                var y   = (match[2] * 1) + 0;
                var key = x + ',' + y;
                
                if( !visited[key] )
                    unordered[ nth++ ] = [ x, y ];
            }

            var stored = JSON.stringify( unordered );
            localStorage.setItem( 'ii/rally/unordered', stored );
            //GM_log( stored );
        }
    }
}

var memorised_map = {};

function memorise_map (ordered, unordered)
{
    for( var i = 0; i < ordered.length; i++ )
    {
        var key = ordered[i] + '';
        memorised_map[ key ] = i + 1;
    }

    for( var i = 0; i < unordered.length; i++ )
    {
        var key = unordered[i] + '';
        memorised_map[ key ] = '@';
    }
}

function label_node (node, key)
{
    var label = memorised_map[ key ];

    if( label )
    {
        var text = document.createTextNode( label );
        var parent;
        var child;

        if( node.nodeName.toUpperCase() == 'TD' )
        {
            parent = node;
            child = parent.firstChild;
        }
        else
        {
            parent = node.parentNode;
            child = node;
        }
        
        if( child ) { parent.replaceChild( text, child ); }
        else        { parent.appendChild( text );         }

        parent.style.color = label_colour;
    }
}

function label_city (node, x, y)
{
    var key = x + ',' + y;
    var label = memorised_map[ key ];

    if( label )
    {
        if( node.textContent )
            node.textContent =
              node.textContent.replace(/(.).*(.)/, '$1 ' + label);
        else
            node.textContent = label;

        node.style.color = label_colour;
    }
}

function label_cells (rows, ifilter, skip)
{
    for( var i = 0; i < rows.snapshotLength; i++ )
    {
        var row  = rows.snapshotItem( i );
        var city = false; 
        var city_labelled = false;    
        var last_x = false;
        var last_y = false;

        for( var node = row.firstChild; node != null; node = node.nextSibling )
        {
            // skip non table cells
            if( node.nodeName.toUpperCase() != 'TD' ) continue;
            
            if( skip( node ) ) continue;

            // we used to identify the table cells by the transparent images
            // inside but that's changed now:
            var images =
                document.evaluate( ifilter, node, null,
                                   XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                                   null );

            if( images.snapshotLength > 0 )
            {
                var match;
                var img = images.snapshotItem( 0 );
                var txt = img.getAttribute( 'alt' );
                var target = txt ? img : node;

                if( !txt )
                    txt = ( node.getAttribute( 'alt'   ) ||
                            node.getAttribute( 'title' ) );

                if( match = 
                    (txt && txt.match( /.*?\(\s*([0-9]+)\s*,\s*([0-9]+)\s*\)/ )))
                {
                    var x = match[1] * 1;
                    var y = match[2] * 1;
                    var key = x + ',' + y;
                    label_node( target, key );
                    last_x = x;
                    last_y = y;
                }

                if( city && !city_labelled )
                {
                    label_city( city, last_x - 1, last_y );
                    city_labelled = true;
                }
            }
            else
            {
                city = node;

                if( last_x && last_y )
                {
                    label_city( city, last_x + 1, last_y );
                    city_labelled = true;
                }
            }
        }
    }
}

function maxi_map_skip (node)
{
    // skip the table-dressing round the edges
    if( node.getAttribute('colspan') ) return true;
    if( node.getAttribute('rowspan') ) return true;

    // skip the XY label cells
    if( node.textContent.match( /^\s*[0-9]+\s*$/ ) ) return true;

    return false;
}

function update_maxi_map ()
{
    var filter   = ( "//div/table/tbody/tr"                                    +
                     "/td[@align='center' and child::text() = '25']"           +
                     "/parent::*[1]/parent::tbody[1]/tr[position() mod 2 = 1]" );
    var ifilter  = "//td";
    var rows     = document.evaluate( filter, document, null,
                                       XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                                       null );
    var ordered   = localStorage.getItem( 'ii/rally/ordered'   );
    var unordered = localStorage.getItem( 'ii/rally/unordered' );

    if( ordered   && (ordered.length   > 0) &&
        unordered && (unordered.length > 0)  )
    {
        ordered   = JSON.parse( ordered   );
        unordered = JSON.parse( unordered );
        memorise_map( ordered, unordered );
        label_cells( rows, ifilter, maxi_map_skip );
    }
}

function update_mini_map ()
{
    var filter  = "//div/table/tbody/tr/td/img[@src='images/trans.gif' and @alt]/parent::*/parent::*";
    var ifilter = "img[@src='images/trans.gif' and @alt]";
    var rows    = document.evaluate( filter, document, null,
                                     XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                                     null );


    var ordered   = localStorage.getItem( 'ii/rally/ordered'   );
    var unordered = localStorage.getItem( 'ii/rally/unordered' );

    if( ordered   && (ordered.length   > 0) &&
        unordered && (unordered.length > 0)  )
    {
        ordered   = JSON.parse( ordered   );
        unordered = JSON.parse( unordered );
        memorise_map( ordered, unordered );
        label_cells( rows, ifilter, function (node) { return false; } );
    }
}

function check_progress ()
{
    var filter = ( "//b/span[" + 
                   "starts-with(child::text(), 'You have reached a') and " +
                   "contains(child::text(), 'Rally Point')]" );
    var checkpoints =
        document.evaluate( filter, document, null, 
                           XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                           null );

    if( checkpoints.snapshotLength > 0 )
    {
        var rlink = ( "//a[ contains(@href, 'runmodule.php?'          ) and " + 
                      "     contains(@href, 'module=hundredpointrally') and " + 
                      "     contains(@href, 'op=showpoints'           ) ]"    );

        var hrefs = document.evaluate( rlink, document, null, 
                                       XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                                       null );

        if( hrefs.snapshotLength > 0 )
        {
            var a = hrefs.snapshotItem( 0 );
            a.click();
        }
    }
}

if( document.documentURI.match(/module=hundredpointrally/) && 
    document.documentURI.match(/op=showpoints/) )
{
    read_route();
}

if( document.documentURI.match(/module=worldmapen/) && 
    document.documentURI.match(/op=viewmap/) )
{
    update_maxi_map();
}

if( document.documentURI.match(/module=worldmapen/) && 
    document.documentURI.match(/op=(?:move|fight|beginjourney|continue)/) )
{
    check_progress();
    update_mini_map();
}
