// ==UserScript==
// @name           Yahoo Fantasy Baseball Expand Recent Activity
// @namespace      http://glenncarr.com/greasemonkey/yahoofantasy
// @description    Adds more recent transactions and messages to the league home page (currently just handles messages)
// @include        *baseball.fantasysports.yahoo.com/*
// $LastChangedRevision: 87 $
// $LastChangedDate: 2007-05-29 15:05:50 -0500 (Tue, 29 May 2007) $
// ==/UserScript==
/*
   Updates:
   18-May-2007 - Added Reply link to each message; Made message headers the same color
   18-May-2007 - Fixed prepending duplicate 'Re: ' when replying; Increased message composition box width and font size
   29-May-2007 - Changed include path to allow http://beta.
*/

(function() {

// Increase width and font of message textarea...
if ( location.href.match(/baseball\.fantasysports\.yahoo\.com\/b\d\/\d+\/postmessage/i) )
{
    var ta = document.getElementsByTagName( 'TEXTAREA' );
    if ( !ta )
        return;
    ta = ta[ 0 ];
    ta.style.width = "100%";
    ta.style.fontSize = "130%";
    return;
}

if (!location.href.match(/baseball\.fantasysports\.yahoo\.com\/b\d\/\d+/i))
    return;

var divMessages = document.getElementById( 'recentmessages' );
if ( divMessages == null )
    return;

var msgTable = divMessages.getElementsByTagName( 'TABLE' );
if ( msgTable == null )
    return;
msgTable = msgTable[ 0 ];

var MAX_MESSAGES_TO_DISPLAY = GM_getValue("message_count", 10);
GM_setValue("message_count", MAX_MESSAGES_TO_DISPLAY);

var WORKING_IMG_URL = "data:image/gif,GIF89a%0A%00%0A%00%91%03%00%CC%CC%CC%FFff%FF%00%00%FF%FF%FF!%FF%" +
"0BNETSCAPE2.0%03%01%00%00%00!%F9%04%05%00%00%03%00%2C%00%00%00%00%0A%00%0A%00%00%02%17%9C'r%06%80%1A%" +
"02s'%AE%3Bqk%9A%E2%C3%81%14Gz%D9Q%00%00!%F9%04%05%00%00%03%00%2C%01%00%00%00%08%00%03%00%00%02%0A%9C%" +
"136%22%83%03%00S%10%14%00!%F9%04%05%00%00%03%00%2C%00%00%00%00%06%00%06%00%00%02%0C%9C%070%11%A8%7C%A" +
"2%11%22%D2X%00%00!%F9%04%05%00%00%03%00%2C%00%00%01%00%03%00%08%00%00%02%0A%1C%608%13%C1%BE%96%10c%16" +
"%00!%F9%04%05%00%00%03%00%2C%00%00%04%00%06%00%06%00%00%02%0A%04%86c%C9%1C%E1%A0%10l%16%00!%F9%04%05%" +
"00%00%03%00%2C%01%00%07%00%08%00%03%00%00%02%0A%04%86%23b%13%A1Dz%A9%00%00!%F9%04%05%00%00%03%00%2C%0" +
"4%00%04%00%06%00%06%00%00%02%0C%9C'r%A8%BB%11%06%00%03Jz%0A%00!%F9%04%09%00%00%03%00%2C%07%00%01%00%0" +
"3%00%08%00%00%02%0A%94f%A3%1A1%BD%00%18r%14%00%3B";

GM_xmlhttpRequest({
    method: 'GET',
    url: location.href.match( /(^.*baseball\.fantasysports\.yahoo\.com\/b\d\/\d+)/i )[1] + '/messages',
    onload: getAllMessagesHandler( handleAllMessages, msgTable ),
    });


function handleAllMessages( responseText, msgTable )
{
    var tables = responseText.split( /\<table[^>]+\>|\<\/table\>/i );
    for ( var i = 0; i < tables.length; i++ )
    {
        if ( tables[ i ].match( /Date\<\/th\>/i ) )
        {
            var rows = tables[ i ].split( /\<tr/i );
            if ( rows.length > (MAX_MESSAGES_TO_DISPLAY + 2) /* header rows */ )
                rows.splice( MAX_MESSAGES_TO_DISPLAY + 2, rows.length - (MAX_MESSAGES_TO_DISPLAY + 2) );
            msgTable.innerHTML = rows.join( '<tr' );
            var msgCount = 0;
            for ( var iRow = 0; iRow < msgTable.rows.length; iRow++ )
            {
                var row = msgTable.rows[ iRow ];
                if ( !/^row[12]/i.test( getClassName( row ) ) )
                    continue;

                msgCount += 1;

                row.cells[ 2 ].innerHTML = row.cells[ 2 ].innerHTML.replace( /^\s*\d+(\s+|(&nbsp;)+)/, '' );
                var msgSubject = stripTags( row.cells[ 2 ].innerHTML );
                row.style.background = "#eee";

                var newRow = document.createElement( 'TR' );
                var msgCell = document.createElement( 'TD' );
                newRow.appendChild( msgCell );
                msgCell.setAttribute( "colspan", "4" );
                msgCell.innerHTML = '&nbsp;<span style="color: #666680; font-style: italic">Retrieving message... <img align="absmiddle" src="' + WORKING_IMG_URL + '"/></span>';
                row.parentNode.insertBefore( newRow, row.nextSibling );

                for ( var iCell = 0; iCell < row.cells.length; iCell++ )
                {
                    var cell = row.cells[ iCell ];
                    var a = cell.getElementsByTagName( 'A' );
                    if ( a != null && a.length > 0 )
                    {
                        a = a[ 0 ];
                        var hrefMessage = a.getAttribute( 'href' ).replace( /^\//, 'http://baseball.fantasysports.yahoo.com/' );
                        GM_xmlhttpRequest({
                            method: 'GET',
                            url: hrefMessage,
                            onload: getMessageContentHandler( messageContentHandler, msgCell, msgSubject )
                            });
                        break;
                    }
                }

                if ( msgCount == MAX_MESSAGES_TO_DISPLAY )
                    return;
            }
        }
    }
}

function messageContentHandler( responseText, msgCell, msgSubject )
{
    var tables = responseText.split( /\<table[^>]+\>|\<\/table\>/i );
    for ( var i = 0; i < tables.length; i++ )
    {
        if ( tables[ i ].match( /Message:.*\d+ of \d+/i ) )
        {
            msgCell.innerHTML = '<table style="border: solid 1px; background: #ffffdd; margin-left: 1em; margin-bottom: 1em; width: 100%">' + tables[ i ] + '</table>';
            var table = msgCell.childNodes[ 0 ];
            table.rows[ 0 ].innerHTML = ''; //'<td style="text-align: right; border: solid 1px red">' + table.rows[0].cells[0].getElementsByTagName('B')[0].innerHTML + '</td>';
            var cell = table.rows[ 1 ].cells[ 0 ];
            cell.style.fontSize = "inherit";
            var url = location.href.replace( /(.*\/\d+$)/i, '$1/postmessage?subject=Re:+' + msgSubject.replace( /^re:[\+\s+]/i, '' ) );
            cell.innerHTML = '<table align="right"><tr><td style="font-size: inherit">[ <a href="' + url + '" style="font-size: 85%">Reply</a> ]</td></tr></table>' + cell.innerHTML.replace( /\<hr.*|\<p\>/gi, '' );
            return;
        }
    }
}

function getAllMessagesHandler( responseHandler, msgTable )
{
    return function ( responseDetails )
    {
        if ( responseDetails.status == 200 )
            responseHandler( responseDetails.responseText, msgTable );
    }
}

function getMessageContentHandler( responseHandler, msgCell, msgSubject )
{
    return function ( responseDetails )
    {
        if ( responseDetails.status == 200 )
            responseHandler( responseDetails.responseText, msgCell, msgSubject );
    }
}

function getClassName( el )
{
    var className = el.getAttribute( 'class' );
    if ( className == null )
        className = el.getAttribute( 'className' );
    return className;
}

function stripTags(s)
{
    return s.replace(/<\/?[^>]+>|&nbsp;/gi,'');
}
})();