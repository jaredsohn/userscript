// ==UserScript==
// @name        Tokyotosho extender
// @version     0.3
// @description Removes crap from page header, Adds on-page filters for pupolar torrents, movie resolutions, subbmitter, Adds hyperlinks to AniDB search for torrent titles
// @namespace   TG
// @include     http://*.tokyotosho.info/*
// @include     http://tokyotosho.info/*
// @include     https://*.tokyotosho.info/*
// @include     https://tokyotosho.info/*
// @grant       none
// ==/UserScript==

var __anidb_search_link = 'http://anidb.net/perl-bin/animedb.pl?show=animelist&do.search=search&adb.search=';
var __anidb_link        = 'http://anidb.net/';

/** ============================================================================
    UTILS
    ============================================================================
 */

//  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --
function insertAfter( newElement, targetElement )
{
    //target is what you want it to go after. Look for this elements parent.
    var parent = targetElement.parentNode;

    //if the parents lastchild is the targetElement...
    if ( parent.lastchild == targetElement ){
        //add the newElement after the target element.
        parent.appendChild( newElement );
    } else {
        // else the target has siblings, insert the new element between the target and it's next sibling.
        parent.insertBefore( newElement, targetElement.nextSibling );
    }
}

//  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --
function addEvent( elem, type, handler )
{
    if ( elem.addEventListener ){
        elem.addEventListener( type, handler, false );
    } else {
        elem.attachEvent( 'on' + type, handler );
    }
}

//  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --
function setCookie( name, value, expires, path, domain, secure )
{
    document.cookie = name + "=" + escape( value ) +
      ((expires) ? "; expires=" + expires : "") +
      ((path) ? "; path=" + path : "") +
      ((domain) ? "; domain=" + domain : "") +
      ((secure) ? "; secure" : "");
}

//  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --
function getCookie( name )
{
    var cookie = " " + document.cookie;
    var search = " " + name + "=";
    var setStr = null;
    var offset = 0;
    var end = 0;
    if (cookie.length > 0) {
        offset = cookie.indexOf( search );
        if ( offset != -1 ){
            offset += search.length;
            end = cookie.indexOf(";", offset)
            if ( end == -1 ){
                end = cookie.length;
            }
            setStr = unescape( cookie.substring( offset, end ) );
        }
    }
    return ( setStr );
}

//  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --
// highlight and save current choice
function highlightChoice( selector, selected_id_value )
{
    var  as = document.querySelectorAll( selector );
    for ( var i = 0; i < as.length; i++ ){
        as[i].setAttribute( 'style', 'font-weight:' + (selected_id_value == as[i].id ? 'bold' : 'normal' ) );
    }
    setCookie( selector, selected_id_value );
}

//  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --
// func( caption, row0, row1, a_caption )
function EnumerateTableRows( func )
{
    // enumerate table row pares
    var  tds = document.querySelectorAll( 'td.desc-top' );
    for ( var i = 0; i < tds.length; i++ ){
        var row0 = tds[i].parentNode;
        var row1 = tds[i].parentNode.nextSibling;
        if ( row0 && row1 ){
            // extract torrent caption - for most filters it would be usefull
            var  a = row0.querySelector( 'td.desc-top a[rel=nofollow]' )
            if ( a ){
                func( a.innerHTML, row0, row1, a );
            }
        }
    }
}

//  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --
var   __filters = []; // { selector: , rowVisibleFunc: , selected_id_value:  };
                      // rowVisibleFunc( row0, row1, caption, selected_id_value )
var   __initial_filter = false;

//  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --
function FilterTableRows()
{
    EnumerateTableRows( function ( capt, row0, row1 )
                        {
                            var  visible = true;
                            for ( var f = 0; f < __filters.length && visible; f++ ){
                                visible = visible
                                       && __filters[f].rowVisibleFunc( row0, row1, capt, __filters[f].selected_id_value );
                            }
                            // show/hide pair of rows
                            var attr = (visible ? 'table-row' : 'none');
                            document.all ? row0.runtimeStyle.display = attr : row0.style.display = attr;
                            document.all ? row1.runtimeStyle.display = attr : row1.style.display = attr;
                        }
                      );
}

//  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --
function InsertFilteringOptions( selector, HTML, RowVisibilityFunc )
{
    var after = document.querySelector( 'input[type=submit] + br + script' );
    if ( !after )    after = document.querySelector( 'input[type=submit] + br' );
    if ( after ){
        // insert HTML
        var  s = document.createElement( 'span' );
        s.innerHTML = HTML;
        insertAfter( s, after );

        // assign filtering event handler
        var  f  = __filters.length;
        var  as = document.querySelectorAll( selector );
        for ( var i = 0; i < as.length; i++ ){
            addEvent( as[i], 'click'
                    , function (e){
                          // extract clicked target A element
                          e = e ? e : window.event;
                          var  a = e.target || e.srcElement;
                          __filters[f].selected_id_value = a.id;
                          FilterTableRows();
                          // highlight current choice
                          highlightChoice( selector, __filters[f].selected_id_value );
                      }
                    );
        }

        // register filter and current/default selection
        var  prev = getCookie( selector );
        __initial_filter = __initial_filter || prev;
        prev = prev ? prev : as[0].id;
        __filters[f] = { selector: selector, rowVisibleFunc: RowVisibilityFunc, selected_id_value: prev };
        highlightChoice( selector, prev );
    }
}

//  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --
function getSubmitter( capt )
{
    var  ix;
    return ( ( ( capt.substr( 0, 1 ) == '[' )
            && ( ( ix = capt.indexOf( ']', 1 ) ) > 0 )
             ) ? capt.substr( 1, ix - 1 )
               : null
           );
}

/** ============================================================================
    REAL FUNCS
    ============================================================================
 */

//  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --
function AppendAnidbHyperlink()
{
    // enumerate existent submitters
    EnumerateTableRows( function ( capt, row0, row1, a_capt )
                        {
                            // remove first "[submitter]"
                            var  subm = getSubmitter( capt );
                            if ( subm !== null ){
                                capt = capt.substr( ('[' + subm + ']').length );
                            }

                            // extract next "[title - number]" or just "title - number" or just take all remaining
                            var  ix;
                            var  title = getSubmitter( capt );
                            if ( title === null ){
                                ix = capt.indexOf( '[' );
                                title = ( ix > 0 ) ? capt.substr( 0, ix )
                                                   : capt.replace( /\..{1,3}$/, '' ); // strip file extension
                            }
                            // remove special symbols
                            title = title.replace( /&\w+;/g, ' ' );

                            // remove (.*)
                            title = title.replace( /\([^)]*\)/g, '' );

                            // remove dup and trailing spaces
                            title = title.replace( /_+|\s+/g, ' ' );
                            title = title.replace( /^\s+|\s+$/g, '' );

                            // strip episode number
                            title = title.replace( /(\s\d+)\s*-\s*\d+\s?/g, '$1' );
                            title = title.replace( /\s*(-\s*)?((Vol.?|Special|episodes)\s*)?\d+(v\d+)?(\s*(h264|FLAC|AAC|RAW|BD))*$/ig, '' );
//                            title = title.replace( /\s?\d+?\s/g, ' ' );

                            // strip non-letter chars
                            title = title.replace( /[~!@#$%&*"':;<>?.,+=`\/\\|^-]/g, '' );

                            // remove dup and trailing spaces
                            title = title.replace( /\s+/g, ' ' );
                            title = title.replace( /^\s+|\s+$/g, '' );

//                            console.log( title + "     // " + capt );

                            // construct the link
                            var  s = document.createElement( 'sup' );
                            if ( title.length ){
                                s.innerHTML = '<a href="' + __anidb_search_link + escape( title ) + '" class="a_anidb" target="_blank"'
                                            + ' title="\'' + title + '\' - search AniDb">&nbsp;?&nbsp;</a>';
                            } else {
                                s.innerHTML = '<a href="' + __anidb_link + '" class="a_anidb" target="_blank"'
                                            + ' title="Goto AniDb">&nbsp;?&nbsp;</a>';
                            }
                            insertAfter( s, a_capt );
                        }
                      );
}

//  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --
function InsertBr()
{
    var after = document.querySelector( 'input[type=submit] + br + script' );
    if ( !after )    after = document.querySelector( 'input[type=submit] + br' );
    if ( after ){
        // insert HTML
        var  s = document.createElement( 'br' );
        insertAfter( s, after );
    }
}

//  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --
function InsertSubmitterFilter()
{
    // enumerate existent submitters
    var  submitters       = [];
    var  submitters_stats = [];
    EnumerateTableRows( function ( capt, row0, row1 )
                        {
                            var  subm = getSubmitter( capt );
                            if ( subm !== null ){
                                if ( submitters_stats[subm] == undefined ){
                                    submitters_stats[subm] = submitters.length;
                                    submitters[submitters_stats[subm]] = { subm: subm, cnt: 1 };
                                } else {
                                    submitters[submitters_stats[subm]].cnt++;
                                }
                            }
                        }
                      );
    submitters.sort( function ( a, b ){ return ( b.cnt - a.cnt ) } );

    // construct HTML
    var  html = '[Submitter'
              + ':<a class="a_sub" id="">All</a>';
    for ( var s = 0; s < submitters.length; s++ ){
        var  ss = submitters[s];
        html  = html
              + '|<a class="a_sub" id="' + ss.subm + '" href="#' + escape( ss.subm ) + '">'
                + ss.subm + '</a><sup>' + ss.cnt + '</sup>'
              + ( (s == 4) && (s + 1 < submitters.length) ? '<br/>' : '' )
              ;
    }
    html      = html
              + ']&nbsp;';

    InsertFilteringOptions( 'a.a_sub'
                          , html
                          , function ( row0, row1, capt, submitter )
                            {
                                var  visible = true;

                                // analyse submitter
                                if ( submitter.length ){
                                    var  subm = getSubmitter( capt );
                                    visible = subm === submitter;
                                }
                                return ( visible );
                            }
                          );
}

//  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --
function InsertResolutionFilter()
{
    InsertFilteringOptions( 'a.a_res'
                          , '[Resolution'
                          + ':<a class="a_res" id="0"                  >All</a>'
                          + '|<a class="a_res" id="480"  href="#480p"  >480</a>'
                          + '|<a class="a_res" id="720"  href="#720p"  >720</a>'
                          + '|<a class="a_res" id="1080" href="#1080p" >1080</a>'
                          + ']&nbsp;'
                          , function ( row0, row1, capt, resolution )
                            {
                                var  visible = true;

                                // analyse resolution
                                if ( resolution > 0 ){
                                    visible = ( capt.indexOf( resolution + 'p' ) >= 0 )
                                           || ( capt.indexOf( 'x' + resolution ) >= 0 )
                                            ;
                                }
                                return ( visible );
                            }
                          );
}

//  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --
function InsertPopularityFilter()
{
    InsertFilteringOptions( 'a.a_pop'
                          , '[Popularity'
                          + ':<a class="a_pop" id="-1"  >All</a>'
                          + '|<a class="a_pop" id="200"  href="#200c" >200</a>'
                          + '|<a class="a_pop" id="500"  href="#500c" >500</a>'
                          + '|<a class="a_pop" id="1500" href="#1500c">1500</a>'
                          + '|<a class="a_pop" id="3000" href="#3000c">3000</a>'
                          + ']&nbsp;'
                          , function ( row0, row1, capt, popularity )
                            {
                                var  visible = true;

                                // extract statistics
                                var  spans = row1.querySelector( 'td.stats' )
                                                 .getElementsByTagName( 'span' );
                                // analyse popularity
                                if ( spans.length >= 3 ){
                                    var  crit_S = parseInt( spans[0].innerHTML );
                                    var  crit_L = parseInt( spans[1].innerHTML );
                                    var  crit_C = parseInt( spans[2].innerHTML );

                                    visible = ( crit_S + crit_L + crit_C ) >= parseInt( popularity );
                                }
                                return ( visible );
                            }
                          );
}

//  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --
function RemoveSearchBr()
{
    var elm = document.querySelector( 'input[name=size_max]' );
    if ( elm && elm.nextSibling && elm.nextSibling.nodeName == "BR" ){
        elm.nextSibling.parentNode.removeChild( elm.nextSibling );
    }
}

//  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --
function HideGoogleSearch()
{
    var google = document.getElementsByTagName('gcse:search')[0];
    if ( google )    google.parentNode.removeChild( google );
}

//  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --
function HideNewsBlock()
{
    var nb_ul = document.querySelector( 'ul.news' );
    var nb_h1 = document.querySelector( 'h1' );
    var nb_h2 = document.querySelector( 'h2' );
    var nb_h3 = document.querySelector( 'h3' );
    var nb_ct = document.querySelector( 'div.centertext' );
    if ( nb_ul )    nb_ul.setAttribute( 'style', 'display:none' );
    if ( nb_h1 )    nb_h1.setAttribute( 'style', 'font-size:10px' );
    if ( nb_h2 )    nb_h2.setAttribute( 'style', 'display:none' );
    if ( nb_h3 )    nb_h3.setAttribute( 'style', 'display:none' );
    if ( nb_ct )    nb_ct.setAttribute( 'style', 'display:none' );

    var ul_mn = document.querySelector( 'ul.menuwrapper' );
    if ( ul_mn )    ul_mn.setAttribute( 'style', 'padding:0;margin:0;' );
}

//  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --  --
HideNewsBlock();
HideGoogleSearch();
RemoveSearchBr();
AppendAnidbHyperlink();
InsertBr();
InsertSubmitterFilter();
InsertResolutionFilter();
InsertPopularityFilter();
if ( __initial_filter )    FilterTableRows();
