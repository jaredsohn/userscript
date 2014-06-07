// ==UserScript==
// @name           Yahoo FS 2-Week Stat Filter
// @namespace      http://glenncarr.com/greasemonkey/yahoofantasy
// @description    Add 2-week stat filter to Yahoo Fantasy filters
// @include        *fantasysports.yahoo.com/*
// $LastChangedRevision: 302 $
// $LastChangedDate: 2007-09-11 22:20:49 -0500 (Tue, 11 Sep 2007) $
// ==/UserScript==
/*
   Updates:
   17-May-2007 - Fixed to work on Watch List page
   21-May-2007 - Refactor; Should handle all pages with filtering links now
   29-May-2007 - Changed include path to allow http://beta.
   11-Sep-2007 - Added 'Today' option to the stats dropdown
   16-Sep-2010 - Shortened Name & Including all Fantasy Sports
*/

var statSelect = document.getElementById('statselect');
if ( statSelect != null )
{
    for ( var i = 0; i < statSelect.options.length; i++ )
    {
        if ( /last month \(avg\)/i.test( statSelect.options[ i ].text ) )
        {
            var option = document.createElement( 'OPTION' );
            option.value = 'S_AL14';
            option.text = 'Last 2 Weeks (avg)';
            statSelect.insertBefore( option, statSelect.options[ i ].nextSibling );

            option = document.createElement( 'OPTION' );
            option.value = 'S_L14';
            option.text = 'Last 2 Weeks (total)';
            statSelect.insertBefore( option, statSelect.options[ i ].nextSibling );
        }
        else
        if ( /last week \(avg\)/i.test( statSelect.options[ i ].text ) )
        {
            option = document.createElement( 'OPTION' );
            option.value = 'S_D';
            option.text = 'Today';
            statSelect.insertBefore( option, statSelect.options[ i ].nextSibling );
        }
    }
    var matches = location.href.match( /\&stat\d=(S_A?L14|S_D)/i );
    if ( matches )
    {
        var optionValue = matches[ 1 ];
        for ( var i = 0; i < statSelect.options.length; i++ )
        {
            if ( statSelect.options[ i ].value == optionValue )
            {
                statSelect.options[ i ].selected = true;
                break;
            }
        }
    }
}

var links = document.evaluate(
    "//*[contains(@href, 'stat2=L7')]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
if ( links.snapshotLength > 0 )
{
    var lastWeek = links.snapshotItem( 0 );
    var href = lastWeek.href.replace( /L7/, 'L14' );
    var newli = document.createElement( 'LI' );
    newli.innerHTML = '<a href="' + href + '">Last 2 Weeks</a>';
    if ( /&stat2=A?L14/i.test( location.href ) )
        newli.setAttribute( "class", "selected" );
    lastWeek.parentNode.parentNode.insertBefore( newli, nextSiblingEx( lastWeek.parentNode ) );
}

function previousSiblingEx( el )
{
    var p = el;
    do
        p = p.previousSibling;
    while (p && p.nodeType != 1);
    return p;
}

function nextSiblingEx( el )
{
    var p = el;
    do
        p = p.nextSibling;
    while (p && p.nodeType != 1);
    return p;
}

function stripTags(s)
{
    return s.replace(/<\/?[^>]+>|&nbsp;/gi,'');
}
