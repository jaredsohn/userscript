// ==UserScript==
// @name           ii-map
// @namespace      http://users.pepperfish.net/vivek/
// @description    Pop-up map available from any page on the island.
// @include        http://www.improbableisland.com/*
// @include        http://improbableisland.com/*
// @grant          none
// @version        4
// ==/UserScript==

function ignore (x) { }

var map = null;
var ccache = {};
//r logger = console.log;
var logger = ignore;
var xmarks = [];

function x_marks_the_spot (x,y,text)
{
    if( !xmarks[x] )
        xmarks[x] = [];

    xmarks[x][y] = text;
}

function you_are_here (x,y)
{
    if( xmarks[x] )
        return xmarks[x][y];
    return false;
}

function cell_data (node, x , y)
{
    var alt   = you_are_here(x, y);
    var attr  = {};
    var ocol  = node.style.color;

    if(y == 38)
        logger = console.log;
    else
        logger = ignore;

    if( alt )
        node.style.color = '#ff00ff';

    var copy  = node.cloneNode( true );

    if( alt )
        node.style.color = ocol;

    var n_at  = copy.attributes;
    var pdata = [];

    logger('(' + copy.nodeName + '<' + x + ', ' + y + '>');

    if (n_at)
    {
        var matched;

        for( var i = 0; i < n_at.length; i++ )
        {
            var key = n_at[i].name;
            var val = n_at[i].value;
            logger('  ' + key + ' = ' +  val);
            attr[ key ] = val;
        }

        logger('  ' + "checking for map colour");
        // remember the map colour for each terrain type:
        if( attr            && 
            attr['title']   &&
            ( !attr['bgcolor'] ||
              attr['bgcolor'].toUpperCase() != '#FF99900' ) )
            if( matched = attr['title'].match( /\([0-9]+, [0-9]+\) (\S+)/ ) )
                ccache[ matched[1] ] = attr['bgcolor'];

        logger('  ' + "cached map colour");
        // extract the place data:
        var places = document.evaluate( '//a[@title]', copy, null,
                                        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                                        null );

        logger('  ' +  "extracted place info");

        if( places )
        {
            for( var i = 0; i < places.snapshotLength; i++ )
            {
                logger("place [" + i + "]");
                var link = places.snapshotItem(i);
                pdata.push( link.getAttribute('title') );
                link.parentNode.removeChild( link );
            }
        }
    }

    var cdata = { 'tag'     : copy.nodeName    ,
                  'attr'    : attr             ,
                  'places'  : pdata            ,
                  'content' : alt ? alt : copy.textContent };

    logger(')');

    return cdata;
}

function read_map ()
{
    var mfilter = ( "//div/table/tbody/tr"                                    +
                    "/td[@align='center' and child::text() = '25']"           +
                    "/parent::*[1]/parent::tbody[1]/tr[position() mod 2 = 1]" );
    var rows    = document.evaluate( mfilter, document, null,
                                     XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                                     null );
    var tr      = [];

    logger(rows.snapshotLength + " rows harvested");

    if( rows.snapshotLength < 40 )
    {
        return;
    }

    for( var i = 0; i < rows.snapshotLength; i++ )
    {
        var row = rows.snapshotItem( i );
        var y   = 40 - i;

        logger("scanning node " + row.nodeName + "[" + i + "]" );

        if( row.nodeName != 'TR' ) continue;

        var td  = [];

        tr.push( td );
        var x = 0;

        for( var node = row.firstChild; node; node = node.nextSibling )
            if( node.nodeName == 'TD' )
                td.push( cell_data(node, x++, y) );
    }

    for( var y = 0; y < tr.length; y++ )
    {
        for( var x = 0; x < tr[y].length; x++ )
        {
            var attr = tr[y][x]['attr'];

            if( !attr ) continue;

            // override the "you are here" map colour with the terrain colour
            // (since the map is cached, the you-are-here indicator is not up
            // to date in any case)
            if( attr.bgcolor && attr.bgcolor.toUpperCase() == '#FF9900' )
            {
                var matched = attr['title'].match( /\([0-9]+, [0-9]+\) (\S+)/ );
                if( matched && ccache[ matched[1] ] )
                    attr['bgcolor'] = ccache[ matched[1] ];
            }
        }
    }

    map = JSON.stringify( tr );
    localStorage.setItem( 'ii/map', map );
}

logger( "checking URI " +  document.documentURI );
if( document.documentURI.match(/module=worldmapen/) &&
    document.documentURI.match(/op=viewmap/) )
{
    logger( "harvesting map" );
    x_marks_the_spot(22,38, '⚙');
    x_marks_the_spot(10,30, '🂡');
    x_marks_the_spot(14,24, '👾');
    x_marks_the_spot(10,17, '💩');
    x_marks_the_spot(11,05, '🏠');
    x_marks_the_spot(13,11, '🏯');
    x_marks_the_spot(20,13, '😻');
    x_marks_the_spot(04,15, '💀');
    read_map();
}

var data = map ? map : localStorage.getItem( 'ii/map' );

if( !document.documentURI.match(/op=(?:fight|search)/) && data )
{
    var finddiv = [ "//div[@class='navbox' or @class='navhead']" ,
                    "//td[@class='nav']/span[@class='navhead']"  ,
                    "//body" ];
    var script  = document.createElement( 'script' );
    var handler = "var map_data = " + data + ";\n";
    var js      = "\n\
    function toggle_map ()                                                  \n\
    {                                                                       \n\
        var div = null;                                                     \n\
        if( div = document.getElementById('ii-map') )                       \n\
        {                                                                   \n\
            div.parentNode.removeChild( div );                              \n\
            return;                                                         \n\
        }                                                                   \n\
                                                                            \n\
        div       = document.createElement( 'div'    );                     \n\
        var table = document.createElement( 'table'  );                     \n\
        var tbody = document.createElement( 'tbody'  );                     \n\
        var close = document.createElement( 'button' );                     \n\
                                                                            \n\
        div.setAttribute( 'id', 'ii-map' );                                 \n\
        div.style.position = 'absolute';                                    \n\
        div.style.top  = '10';                                              \n\
        div.style.right = '10';                                             \n\
        div.style.zIndex = '100';                                           \n\
        div.style.backgroundColor = '#000000';                              \n\
        table.style.borderSpacing = '1px';                                  \n\
        close.setAttribute( 'onclick', 'this.parentNode.parentNode.removeChild(this.parentNode);' );\n\
        close.style.fontSize = '10px';                                      \n\
        close.textContent = 'close';                                        \n\
                                                                            \n\
        table.appendChild( tbody );                                         \n\
        div.appendChild  ( close );                                         \n\
        div.appendChild  ( table );                                         \n\
                                                                            \n\
        for( var y = 0; y < map_data.length; y++ )                          \n\
        {                                                                   \n\
            var row = document.createElement( 'tr' );                       \n\
                                                                            \n\
            for( var x = 0; x < map_data[y].length; x++ )                   \n\
            {                                                               \n\
                var cell = document.createElement( map_data[y][x]['tag'] ); \n\
                cell.textContent = map_data[y][x]['content'];               \n\
                var places = map_data[y][x]['places'];                      \n\
                var l = places.length;                                      \n\
                for( var key in map_data[y][x]['attr'] )                    \n\
                  if( key != 'colspan' )                                    \n\
                    cell.setAttribute( key, map_data[y][x]['attr'][key] );  \n\
                cell.setAttribute( 'height', '12px' );                      \n\
                cell.setAttribute( 'width' , '12px' );                      \n\
                cell.style.fontSize = '12px';                               \n\
                cell.style.padding = '0px';                                 \n\
                if( cell.textContent.match(/^[0-9]+\\s*$/)  &&              \n\
                    cell.style.backgroundColor == ''     )                  \n\
                {                                                           \n\
                    cell.textContent =                                      \n\
                      cell.textContent.replace(/\\s+/g, '');                \n\
                    cell.style.color = '#ffffff';                           \n\
                    cell.style.border = 'solid 1px white';                  \n\
                }                                                           \n\
                else if ( !cell.textContent )                               \n\
                {                                                           \n\
                    cell.style.color = '#000000';                           \n\
                }                                                           \n\
                row.appendChild( cell );                                    \n\
                                                                            \n\
                if( l > 0 )                                                 \n\
                {                                                           \n\
                    var title = cell.getAttribute( 'title' );               \n\
                    title += ' : ' + JSON.stringify( places );              \n\
                    cell.setAttribute( 'title', title );                    \n\
                    if( cell.textContent == '' )                            \n\
                        cell.textContent = '•';                             \n\
                }                                                           \n\
                                                                            \n\
            }                                                               \n\
                                                                            \n\
            tbody.appendChild( row );                                       \n\
        }                                                                   \n\
                                                                            \n\
       document.body.appendChild( div );                                    \n\
    }";

    payload = handler + js;
    script.setAttribute( "type", "application/javascript" );
    script.textContent = payload;

    var divs = null;

    for( var i = 0; i < finddiv.length; i++ )
    {
        divs = document.evaluate( finddiv[i], document, null,
                                  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                                  null );
        if( divs && (divs.snapshotLength > 0) ) break;
    }

    if( divs.snapshotLength > 0 )
    {
        document.body.appendChild( script );

        var info   = divs.snapshotItem( 0 );
        var button = document.createElement( 'button' );
        //r lethe  = document.createElement( 'button' );
        var br     = document.createElement( 'br' );

        button.setAttribute( 'title', 'map' );
        button.textContent = 'map';
        button.setAttribute( 'onclick', 'toggle_map();' );
        button.style.fontSize = '10px';

        //the.setAttribute( 'title', 'forget' );
        //the.textContent = 'forget';
        //the.setAttribute( 'onclick', 'localStorage.setItem("ii/map", "");' );
        //the.style.fontSize = '10px';

        info.insertBefore( br    , info.firstChild );
        //fo.insertBefore( lethe , info.firstChild );
        info.insertBefore( button, info.firstChild );

        document.body.removeChild( script );
    }
}
