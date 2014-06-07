// ==UserScript==
// @name        ii-truancy
// @namespace   http://users.pepperfish.net/vivek/
// @description Adds truancy info to your XP bar
// @include     http://www.improbableisland.com/*
// @include     http://improbableisland.com/*
// @version     3
// ==/UserScript==

var barrier =  [ false ,
                 0     , 100   , 400   , 1002  , 1912  ,
                 3140  , 4707  , 6641  , 8985  , 11795 ,
                 15143 , 19121 , 23840 , 29437 , 36071 ,
                 43930 , 43930 ];

const BASE_PATH = 
    ( "//table/tbody/tr" + 
      "/td[@class='charhead' and contains(child::text(),'Personal Info')]" );

const AFTER_BASE =
    "parent::*/parent::*/parent::*/following-sibling::table/tbody/tr/td";
//    "parent::*/following-sibling::tr/td[@class='charinfo']";

const THIS_CELL = "/ancestor-or-self::td[1]"
const NEXT_CELL = "/following-sibling::td[1]";
const Maths = Math;

function MIN () { return Maths.min.apply( this, arguments ); }

function labelled_cell (label)
{
    var path =
        AFTER_BASE + "/descendant-or-self::*[contains(child::text(),'"
        + label + "')]" + THIS_CELL + NEXT_CELL;

    return path;
}

function find_node( path, context )
{
    var found = document.evaluate( path, context, null, 
                                   XPathResult.ANY_UNORDERED_NODE_TYPE, null );

    return ( found && found.singleNodeValue ) ? found.singleNodeValue : null;
}

function level_experience (level, dks)
{
    return (level > 0) ? (barrier[ level  ] + ((level - 1)* dks * 25)) : 0;
}

function redraw_chart( tr, exp, level, dks )
{
    var exp_index  = -1;
    var experience = [];
    var pwidths    = [];
    var remove     = [];

    for( var i = 0; i < 4 && ((level + i) < 18); i++ )
        experience[ i ] = level_experience( level + i, dks );

    if( exp > 0 )
    {
        for( var i = experience.length; i > 0; i-- )
        {
            if( exp > experience[ i - 1 ] )
            {
                // experience.splice( i, 0, exp );
                exp_index = i;
                break;
            }

            if( exp == experience[ i - 1 ] )
            {
                exp_index = i - 1;
                break;
            }
        }
    }

    // exp_index is the position of the current experience in the list
    // the other experiences are Base - Next - Truant - tRuant 2
    // construct a table thusly:
    // total span S is e[3] - e[0]
    //    Sn = (N - B) / S
    //    St = (T - N) / S
    //    Sr = (R - T) / S
    //  | → N (red)   | → T (orange) | → R (yellow) |
    //  | → C (white)      | → 2 (red)              |
    // special case - C < base - whole of 2nd row is red.
    // otherwise Sc = (C - B) / S
    var span = experience[experience.length - 1] - experience[0];
    
    for( var i = 1; i < experience.length; i++ )
        pwidths.push( ( (experience[i] - experience[i - 1]) / span ) * 100 );

    // add the calibration bar:
    var cal = document.createElement( 'td' );
    var ebr = document.createElement( 'td' );
    var tr2 = document.createElement( 'tr' );
    var col = [ '#ff0000', '#ffa500', '#ffff00', '#00ff00', '#00bfff' ];
    var bs  = window.getComputedStyle( tr, null );

    tr2.style.position = 'absolute';
    tr2.style.width    = bs.width;

    ebr.style.backgroundColor = '#1f1f1f';
    ebr.style.padding  = '0px';
    ebr.style.height   = '4px';
    ebr.style.position = 'absolute';
    ebr.style.top      = '0px';
    ebr.style.width    = bs.width;

    cal.style.padding  = '0px';
    cal.style.height   = '4px';
    cal.style.position = 'absolute';
    cal.style.width    = bs.width;

    var last_width = '0';

    for( var i = 0; i < pwidths.length; i++ )
    {
        var bar   = document.createElement( 'span' );
        var width = pwidths[i];
        bar.textContent           = ' ';
        bar.style.width           = width + '%';
        bar.style.backgroundColor = col[ i ];
        //bar.style.top             = '0px';
        bar.style.maxHeight       = '4px';
        bar.style.position        = 'absolute';
        bar.style.overflow        = 'hidden';
        bar.style.left            = last_width + '%';
        bar.style.float           = 'left'
        bar.style.display         = 'inline-block';
        bar.style.zIndex          = '99';
        bar.title                 = experience[ i + 1 ];
        cal.appendChild( bar );
        last_width = last_width * 1 + width * 1;
    }

    if( exp_index >= 1 )
    {
        var bar    = document.createElement( 'span' );
        var width  = MIN( ( (exp - experience[0]) / span ) * 100, 100 ) + '%';
        var earned = ( (exp_index == 1) ? '#f5f5f5' : 
                       (exp_index == 2) ? '#00bfff' : '#0000ff' );
        bar.textContent           = ' ';
        bar.style.width           = width;
        bar.style.backgroundColor = earned;
        //bar.style.top             = '1px';
        bar.style.maxHeight       = '4px';
        bar.style.position        = 'absolute';
        bar.style.overflow        = 'hidden';
        bar.style.left            = '0%'; 
        bar.style.float           = 'left';
        bar.style.display         = 'inline-block';
        bar.style.zIndex          = '100';
        ebr.appendChild( bar );
    }

    // GM_log( JSON.stringify(experience) + ' [' + exp_index + ']' );

    tr2.appendChild( ebr );
    tr2.appendChild( cal );    
    tr.parentNode.appendChild( tr2 );

    // remove the old chart:
    tr.parentNode.removeChild( tr  );
}

if( !document.documentURI.match(/\/(?:shades|graveyard)\.php/) )
{
    var base_node  = find_node( BASE_PATH , document );

    if( base_node )
    {
        var level_path = labelled_cell( 'Level' );
        var exp_path   = labelled_cell( 'Experience' );
        var data_path  =
            { 'level'      : level_path ,
              'experience' : exp_path   ,
              'bar'        : exp_path + "/descendant::table/tbody/tr" };
        var char_data  = {};

        for( var key in data_path )
            char_data[ key ] = find_node( data_path[ key ], base_node );

        var level = char_data.level ? char_data.level.textContent * 1 : false;

        if( level )
        {
            var expstr = char_data.experience.textContent;
            var exp;
            var current_exp;
            var target_exp;

            if( exp = expstr.match( /([\d,]+)\/([\d,]+)/ ) )
            {
                target_exp  = exp[2] * 1;
                current_exp = exp[1];
                current_exp = current_exp.replace( /,/g, '' );
                current_exp = current_exp * 1;
            }

            var dks = (target_exp - barrier[ level + 1 ]) /  level / 25;
    
            redraw_chart( char_data.bar, current_exp, level, dks );
        }
    }
}