// ==UserScript==
// @name        ii-travel-ui
// @namespace   http://users.pepperfish.net/vivek/
// @description Re-order main ui elements while travelling
// @include     http://www.improbableisland.com/*
// @grant       none
// @version     5
// ==/UserScript==

const TEXT = document.createTextNode( '' ).nodeType;
const SECT_SNAME = 0;
const SECT_XPATH = 1;
const SECT_MATCH = 2;
const SECT_NODES = 3;
const SECT_DOWN  = 4;
const SECT_BREAK = 5;

const SECT_START = 1;
const SECT_END   = 2;

const filters = [ "//div[@class='maincolumn']"     + "/descendant::h2" ,
                  "//td[@class='content']"         + "/descendant::h2" ];
//                "//fieldset/div[@class='block']" + "/descendant::h2" ,
//                "//body"                         + "/descendant::h2" ];

var visible     = { };
const new_order = [ 'subtitle', 'titan', 'create', 'herbs', 'map', 'edge', 'chat', 'places' ];

for( var i = 0; i < new_order.length; i++ )
    visible[ new_order[i] ] = true;

// normally we travel up the xpath to the top level to find the node we actually
// want to move in the page layout: eg for 'places' we want to move the <table>
// however in some cases this won't work, we actually want to move the _bottom_
// node - for these we set the do-not-ascend flag:
// a section of `null' means add to the last harvested section.
const sections =
  //[ section, xpath, regex-for-content, following-nodes-to-collect, do-not-ascend ]
  [ ['subtitle', "b"                                        , /The gates/                 , 0, 0  ] ,
    ['places'  , "div/table/tbody/tr/td"                    , /\bPlaces\b/                , 0, 0, ] ,
    ['map'     , "div/table/tbody/tr/td"                    , null                        , 0, 0, ] ,
    ['map'     , "div/table"                                , /Travelling - /             , 0, 0, ] ,
    ['chat'    , "div[starts-with(@id, 'chat_map_')]"       , null                        , 0, 0, ] ,
    [ null     , "form/input[starts-with(@id, 'inputmap')]" , null                        , 0, 0, ] ,
    [ null     , "span[@id='pagejumpers']"                  , null                        , 0, 0, ] ,
    [ null     , "div[starts-with(@id, 'chathelp_map_')]"   , null                        , 0, 0, ] ,
    ['edge'    , "div/span[@class]"                         , /^\s*To the (?:north|south)/, 0, 0, ] ,
    ['edge'    , "div/span[@class]"                         , /^\s*To the (?:east|west)/  , 0, 0, ] ];

const text_sections =
    [ [ 'titan' , /^\s*The ground shakes with bass-/,  /heading towards (.*?)!\s*$/ ] ,
      [ 'titan' , /^\s*A mighty Titan towers above/ ,  /Titan's first blow\./       ] ,
      [ 'crate' , /^\s*There is a Supply Crate /    ,  /here\./                     ] ,
      [ 'crate' , /^\s*There are \S+ Supply Crates /,  /here\./                     ] ,
      [ 'herbs' , /^\s*There (is|are) .+?(Root|Leaf|Weed|Seed)/,  /here\./          ] ];

function path_depth (xpath)
{
    var depth  = 0;
    var quoted = false;

    for( var i = 0; i < xpath.length; i++ )
    {
        if( xpath[i] == "'" ) { quoted = !quoted; continue; }
        if( quoted          ) { continue;                   }
        if( xpath[i] == '/' ) { depth++;                    }
    }

    return depth;
}

function find_main_content ()
{
    for( var x = 0; x < filters.length; x++ )
    {
        var filter  = filters[x];
        var heading =
            document.evaluate( filter, document, null,
                               XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                               null );

        if( heading.snapshotLength > 0 )
            return heading.snapshotItem( 0 );
    }

    return false;
}

if( document.documentURI.match( /\/runmodule\.php/  ) &&
    document.documentURI.match( /module=worldmapen/ ) )
{
    var UI = {};
    var title = false;

    if( ( title = find_main_content() ) && title.textContent.match( /Travel/ ) )
    {
        var last = null;

        //console.log("checking travel ui");

        for( var i = 0; i < sections.length; i++ )
        {
            var name = sections[ i ][ SECT_SNAME ];
            var path = sections[ i ][ SECT_XPATH ];
            var regx = sections[ i ][ SECT_MATCH ];
            var more = sections[ i ][ SECT_NODES ] || 0;
            var down = sections[ i ][ SECT_DOWN  ];
            var lbrk = sections[ i ][ SECT_BREAK ];

            path = "following-sibling::" + path;
            //console.log("searching for " + path);

            var found = document.evaluate( path, title, null,
                                           XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                                           null );

            //if( !found || found.snapshotLength < 1 )
            //    console.log( 'path [' + path + ']' + ' not matched' );
            //else
            //    console.log( 'path [' + path + '] -> ' + found + '[' + found.snapshotLength + ']' );

            for( var j = 0; j < found.snapshotLength; j++ )
            {
                var key   = name || last;
                var node  = found.snapshotItem( j );

                //GM_log( '-- node ' + node.nodeName + ' for section ' + key );
                if( !regx || ( node.textContent.search( regx ) >= 0 ) )
                {
                    if( !down )
                        for( var depth = path_depth( path ); depth > 0; depth-- )
                            node = node.parentNode;

                    if( !UI[ key ] )
                        UI[ key ] = [];

                    UI[ key ].push( node );

                    // GM_log( '++ node ' + node.nodeName + ' for section ' + key ); // + payload

                    for( var next = node.nextSibling; next && (more > 0); next = next.nextSibling )
                    {
                        UI[ key ].push( next );

                        if( next.nodeType == TEXT )
                            continue;

                        more--;
                        // GM_log( 'EXTRA node ' + node.nodeName + ' for section ' + key );
                    }

                    break;
                }
            }

            if( name )
                last = name;
        }

        for( var i = 0; i < text_sections.length; i++ )
        {
            var name  = text_sections[ i ][ SECT_SNAME ];
            var start = text_sections[ i ][ SECT_START ];
            var stop  = text_sections[ i ][ SECT_END   ];
            var ts_start = [];

            //console.log('searching for ' + start + ' : ' + stop);

            for( var node = title.nextSibling; node; node = node.nextSibling )
            {
                if( node.nodeType != TEXT )
                    continue;

                if( !node.textContent.match( start ) )
                    continue;

                ts_start.push( node );
            }

            for( var j = 0; j < ts_start.length; j++ )
            {
                var para = [ ];

                for( var node = ts_start[j]; node; node = node.nextSibling )
                {
                    para.push( node );

                    if( node.nodeType == TEXT && node.textContent.match( stop ) )
                        break;
                }

                //console.log('matches text block' +  para);

                if( !UI[ name ] )
                    UI[ name ] = [];

                var container = document.createElement( 'div' );
                // container.style.border = 'dashed white 1px';

                for( var k = 0; k < para.length; k++ )
                    container.appendChild( para[k] );
                container.appendChild( document.createElement('hr') );

                UI[ name ].push( container );
            }
        }

        var point = title.nextSibling;
        var ndiv  = document.createElement( 'table' );
        var tidy  = title.parentNode.insertBefore( ndiv, point );
        tidy = tidy.appendChild(document.createElement('tbody'));

        for( var i = 0; i < new_order.length; i++ )
        {
            var sect  = new_order[i];
            var nodes = UI[ sect ];

            if( !nodes ) continue;

            var sdiv = document.createElement('tr');
            tidy.appendChild(sdiv);
            sdiv = sdiv.appendChild(document.createElement('td'));
            
            // GM_log( 'moving ' + sect + '[' +nodes.length+ '] // ' + nodes[0].textContent );
            for( var j = 0; j < nodes.length; j++ )
            {
                if( nodes[j].style.display == 'block' )
                    nodes[j].style.display = 'inline-block';
                sdiv.appendChild( nodes[j] );
            }
        }

        for( var key in UI )
            if( !visible[ key ] )
                for( var i = 0; i < UI[ key ].length; i++ )
                    UI[ key ][ i ].parentNode.removeChild( UI[ key ][ i ] );
    }
}
