// ==UserScript==
// @name        ii-monsterguide
// @namespace   http://users.pepperfish.net/vivek/
// @description Guide to Improbable Island's Monsters
// @include     http://www.improbableisland.com/*
// @include     http://improbableisland.com/*
// @grant       none
// @version     7
// ==/UserScript==

var TEXT = document.createTextNode( ''  ).nodeType;
var HTML = document.createElement ( 'p' ).nodeType;

const JS_MIME  = 'application/javascript';
const GUIDE_JS = "\n\
function close_monsterguide ()                                               \n\
{                                                                            \n\
    var guide = document.getElementById( 'ii-monsterguide-display' );        \n\
    if( guide )                                                              \n\
        guide.parentNode.removeChild( guide );                               \n\
}                                                                            \n\
                                                                             \n\
function monsterguide ()                                                     \n\
{                                                                            \n\
    var name  = document.evaluate( \"//input[@id='monster']\", document,     \n\
                                   null,                                     \n\
                                   XPathResult.FIRST_ORDERED_NODE_TYPE,      \n\
                                   null );                                   \n\
    var title = name.singleNodeValue.value.toLowerCase();                    \n\
    var key   = 'ii/monster/' + title + '/';                                 \n\
    var div   = document.createElement( 'div' );                             \n\
    var known = false;                                                       \n\
                                                                             \n\
    close_monsterguide();                                                    \n\
                                                                             \n\
    for( var i = 0; i < 18; i++ )                                            \n\
    {                                                                        \n\
        var entry = title + '\\n';                                           \n\
        var desc  = localStorage.getItem( key + i + '/description' );        \n\
        var weap  = localStorage.getItem( key + i + '/weapon'      );        \n\
        var winm  = localStorage.getItem( key + i + '/victory'     );        \n\
        var loss  = localStorage.getItem( key + i + '/defeat'      );        \n\
        var limbs = localStorage.getItem( key + i + '/limbs'       );        \n\
        if( desc )                                                           \n\
        {                                                                    \n\
            var pre  = document.createElement( 'pre' );                      \n\
            var dsc  = document.createElement( 'div' );                      \n\
            entry += 'Level  : ' + i    + '\\n' +                            \n\
                     'Weapon : ' + weap + '\\n' ;                            \n\
                                                                             \n\
            if( winm )                                                       \n\
                entry += 'Victory: ' + winm + '\\n' ;                        \n\
                                                                             \n\
            if( loss )                                                       \n\
                entry += 'Defeat : ' + loss + '\\n' ;                        \n\
                                                                             \n\
            if( limbs )                                                      \n\
                entry += 'Limbs  : ' + limbs + '\\n' ;                       \n\
                                                                             \n\
            pre.textContent = entry;                                         \n\
            dsc.textContent = desc;                                          \n\
            pre.style.whiteSpace = 'pre-wrap';                               \n\
            div.appendChild( pre );                                          \n\
            div.appendChild( dsc );                                          \n\
            div.appendChild( document.createElement('hr') );                 \n\
            known = true;                                                    \n\
        }                                                                    \n\
    }                                                                        \n\
                                                                             \n\
    var close = document.createElement( 'button' );                          \n\
                                                                             \n\
    close.textContent = 'close';                                             \n\
    close.setAttribute( 'onClick', 'close_monsterguide()' );                 \n\
                                                                             \n\
    div.setAttribute( 'id', 'ii-monsterguide-display' );                     \n\
    div.style.overflow  = 'auto';                                            \n\
    div.style.position  = 'fixed';                                           \n\
    div.style.maxWidth  = '90%';                                             \n\
    div.style.maxHeight = '90%';                                             \n\
    div.style.backgroundColor = '#000000';                                   \n\
    div.style.color     = '#ffffff';                                         \n\
    div.style.top       = '10';                                              \n\
    div.style.left      = '10';                                              \n\
    div.style.zIndex    = '100';                                             \n\
    div.appendChild( close );                                                \n\
                                                                             \n\
    document.body.appendChild( div );                                        \n\
}                                                                            \n\
";

function xpath (path, context, type)
{
    var rtype  = XPathResult[ type || 'ORDERED_NODE_SNAPSHOT_TYPE' ];
    var ctx    = context || document;
    var result = document.evaluate( path , ctx, null, rtype, null );

    return result;
}

function mktag (tag, text, attr)
{
    var elem = document.createElement( tag );

    if( attr ) for( var key in attr ) elem.setAttribute( key, attr[key] );
    if( text ) elem.textContent = text;

    return elem;
}

function create_field_guide ()
{
    const hud_path = ( "//table/tbody/tr/td[@class='charhead']"      +
                       "/parent::*/parent::*/parent::*/parent::*[1]" );
    var   hnode    = xpath( hud_path, null, 'FIRST_ORDERED_NODE_TYPE' );
    var   hud_div  = hnode.singleNodeValue;

    if( hud_div )
    {
        var table= mktag( 'table', false, false  );
        var tbody= mktag( 'tbody', false, false  );
        var tr0  = mktag( 'tr' , false   , false );
        var th   = mktag( 'td' , 'Monster Guide', { 'class'   : 'charhead' ,
                                                    'colspan' : '2'        } );
        tr0.appendChild  ( th  );
        tbody.appendChild( tr0 );
        table.appendChild( tbody );
        hud_div.appendChild( table );

        var tr   = mktag( 'tr'    , false   , false );
        var td   = mktag( 'td'    , false   , { 'colspan': 2                } );
        var js   = mktag( 'script', GUIDE_JS, { 'type'   : JS_MIME          } );
        //r form = mktag( 'form'  , false   , { 'id'     : 'monsterguide'   } );
        var name = mktag( 'input' , false   , { 'type'   : 'text'           ,
                                                'id'     : 'monster'        ,
                                                'size'   : '15'             ,
                                                'name'   : 'monster'        } );
        var btn  = mktag( 'button', '🔎'    , { 'onclick': 'monsterguide()' } );

        document.body.appendChild( js );

        td.appendChild   ( name );
        td.appendChild   ( btn  );
        tr.appendChild   ( td   );
        tbody.appendChild( tr   );

        document.body.removeChild( js );
    }
}

function level ()
{
    const lpath = "//span[starts-with(child::text(), ' (Level')][1]";
    var   lnode = xpath( lpath, null, 'FIRST_ORDERED_NODE_TYPE' );
    var   level = ( lnode && lnode.singleNodeValue &&
                    lnode.singleNodeValue.textContent );
    if( level )
    {
        var matched = level.match( /\(Level (\d+)\)/ );
        if( matched )
            return matched[1] * 1;
    }

    return 0;
}

function weapon_of_choice (node)
{
    const wpath = 
        ( "following-sibling::"                                     + 
          "span[starts-with(child::text(),'You have encountered')]" +
          "/following-sibling::"                                    +
          "span[contains(child::text(), 'which lunges at you')]"    +
          "/following-sibling::span[1]"                             );

    var wnode  = xpath( wpath, node, 'FIRST_ORDERED_NODE_TYPE' );
    var weapon = ( wnode && wnode.singleNodeValue &&
                   wnode.singleNodeValue.textContent );

    return weapon;
}

function limbs ()
{
    var lpath  = ( "//a[@class='nav']/div/span[@class='navhi']/parent::*" + 
                   "/following-sibling::div/div/div" );
    var lnodes = xpath( lpath, false, 'ORDERED_NODE_SNAPSHOT_TYPE' );
    var llist  = []; 

    if( lnodes && lnodes.snapshotLength > 0 )
        for( var i = 0; i < lnodes.snapshotLength; i++ )
        {
            var limb = lnodes.snapshotItem( i );
            var text = limb.textContent;
            var ltxt = false;

            if( ltxt = text.match(/^\d+\s+(.*)/) )
                llist.push( ltxt[1] );
        }

    if( llist.length > 0 )
        return llist;

    return false;
}


function store_description ()
{
    const title_path = "//h2[child::text()='The Jungle']";
    var   title      = xpath( title_path, false, 'FIRST_ORDERED_NODE_TYPE' );
    var   start      = title.singleNodeValue;

    if( start )
    {
        var preamble = false;
        var desc     = '';
        var bars     = null;
        var name     = null;
        var done     = false;

        for( var node = start.nextSibling; node; node = node.nextSibling )
        {
            var type = node.nodeType;

            if( type != TEXT && type != HTML )
                continue;

            var text = node.textContent;

            if( text && text.length > 0 )
            {
                if( !preamble                    && 
                    node.nodeName == 'SPAN'      &&
                    text.match( /^You head for/ ) ) 
                { 
                    preamble = true;
                    continue;
                }

                if( text == '~ ~ ~ Fight ~ ~ ~' )
                {
                    done = true;
                    continue;
                }

                if( (desc.length > 0) && (node.nodeName == 'BR') )
                {
                    desc += '\n';
                    continue;
                }

                if( node.nodeName == 'DIV' &&
                    node.getAttribute('id') == 'combatbars' )
                {
                    bars = node;
                    break;
                }

                if( !done )
                    desc += text;
            }
        }

        if( bars )
        {
            var rows = xpath( 'descendant::table/tbody/tr/td[2]', bars, false );
            
            for( var i = 1; !name && (i < rows.snapshotLength); i++ )
                name = rows.snapshotItem( i ).textContent;
        }

        if( name )
        {
            var what = weapon_of_choice( bars );
            var lvl  = level();
            var key  = 'ii/monster/' + name.toLowerCase() + '/' + lvl + '/';

            localStorage.setItem( key + 'description', desc );
            localStorage.setItem( key + 'weapon'     , what );

            var _limbs = limbs();

            if( _limbs )
                localStorage.setItem( key + 'limbs', JSON.stringify(_limbs) );

            return { 'name' : name, 'desc' : desc, 'weapon' : what };
        }
    }

    return null;
}

var monster;
var uri = document.documentURI;

if( uri.match( /\/forest\.php/ ) && uri.match( /op=search/ ) )
{
    monster = store_description();
}

if( uri.match( /\/forest.php/ ) && uri.match( /op=(?:fight|search)/ ) )
{
    var name = null;

    if( !monster || !monster.name )
    {
        const npath = ( "//div[@id='combatbars']"     +
                        "/descendant::table[last()]/" +
                        "tbody/tr/td[2]"              );
        var nnode   = xpath( npath, false, 'FIRST_ORDERED_NODE_TYPE' );

        if( nnode && nnode.singleNodeValue )
            name = nnode.singleNodeValue.textContent.toLowerCase();
    }
    else
    {
        name = monster.name.toLowerCase();
    }

    if( name )
    {
        var vpath = 
            ( "//div[@id='combatbars']/following-sibling::*"          +
              "/descendant-or-self::b/descendant-or-self::span"       +
                "[@class and starts-with(child::text(),'You have ')]" +
              "/preceding::span[1]"                                   );

        var lpath =
            ( "//div[@id='combatbars']/following-sibling::*"        +
              "/descendant-or-self::span"                           + 
                "[@class and starts-with(child::text(),"            +
                                        "'While you lie broken ')]" +
              "/preceding::span[1]"                                 );

        var lnode = false;
        var vnode = xpath( vpath, false, 'FIRST_ORDERED_NODE_TYPE' );

        if( vnode && vnode.singleNodeValue )
        {
            var lev     = level();
            var key     = 'ii/monster/' + name + '/' + lev + '/';
            var victory = vnode.singleNodeValue.textContent;
            localStorage.setItem( key + 'victory', victory );
        }
        else
        {
            lnode = xpath( lpath, false, 'FIRST_ORDERED_NODE_TYPE' );
        }
         
        if( lnode && lnode.singleNodeValue )
        {
            var lev    = level();
            var key    = 'ii/monster/' + name + '/' + lev + '/';
            var defeat = lnode.singleNodeValue.textContent;
            localStorage.setItem( key + 'defeat', defeat );  
        }
    }
}

create_field_guide();
