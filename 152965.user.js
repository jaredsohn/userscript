// ==UserScript==
// @name           polexp.com
// @description    For polexp.com users: добавляет колонку "Стоимость" в разделы "Мои покупки" и "На складе" 
// @description    для удобной оценки стоимости консолидированной посылки.
// @description    Alexey Demakov (allex@all-x.net)
// @namespace      http://www.all-x.net
// @include        https://polexp.com/orders/on_warehouse/
// @include        https://polexp.com/orders/my/
// @version        1.4
// ==/UserScript==
                
// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() 
{
    if( typeof unsafeWindow.jQuery == 'undefined') 
    { 
        window.setTimeout( GM_wait, 100 );
    } else {
        $ = unsafeWindow.jQuery;
        handlers();
        columns();
        details();
    }
}
GM_wait();

function handlers()
{
    $('.select_row').click(function(){
            var place = $( "table.table tr:first > th:nth-child(5)" );
            var total = Number( place.text() );
            var x = Number( $( "td:nth-child(5)", $(this).parents("tr") ).text() );            
            if($(this).is(':checked')){
                total += x;
            }
            else{
                total -= x;
            }
              place.text( total.toFixed(2) );
    });

    $('#masterbox').click(function(){
            var place = $( "table.table tr:first > th:nth-child(5)" );
            var total = 0;
            if ( $(this).attr('checked') )
            {
                $( "td:nth-child(5)", $(this).parents("table") ).each(
                    function(i)
                    {
                        var x = Number( $(this).text() );
                        total += x;
                    }
                );                
            }
            place.text( total.toFixed(2) );
    });
}

function columns()
{
    $( "table.table tr:first > th:nth-child(4)" ).after( "<th>0</th>" );
    $( "table.table tr:not(:first) > td:nth-child(4)" ).after( "<td>0</td>" );
}

function callback( i, td )
{
    return function( req, textStatus )
            {
                var doc = req.responseText;

                var ITOGO = '<div align="right">Итого:</div></td>';
                var TD = '<td style="padding:4px">';

                var start = doc.indexOf( ITOGO );
                if( start <= 0 ) {
                    return;
                }
                start = start + ITOGO.length;
                start = doc.indexOf( TD, start ) + TD.length;
                start = doc.indexOf( TD, start ) + TD.length;
                start = doc.indexOf( TD, start ) + TD.length;
                var end = doc.indexOf( '</td>', start );
                var itogo = Number( doc.substring( start, end-1 ).replace(',','.') ).toFixed(2);
                $( "td:nth-child(5)", $(td).parents("tr") ).text( itogo );
                if( endsWith( document.location.href, '/my/' ) )
                {
                    var place = $( "table.table tr:first > th:nth-child(5)" );
                    var total = Number( place.text() ) + Number( itogo );
                    place.text( total.toFixed(2) );
                }

                var tooltip = "";

                var ACTION ='<th width="40">Действие</th>';
                start = doc.indexOf( ACTION ) + ACTION.length;
                var TD1 = '<td style="padding: 4px">';
                while( true )
                {
                    start = doc.indexOf( '<tr>', start );
                    if( start <= 0 ) break;
                    start = doc.indexOf( TD1, start ) + TD1.length;
                    end = doc.indexOf( '</td>', start );
                    var item = doc.substring( start, end ).trim();
                    if( item === '&nbsp;' ) break;
                    if( tooltip.length > 0 ) tooltip = tooltip + "\n";
                    tooltip = tooltip + item;
                }
                $( "td:nth-child(7) a:first", $(td).parents("tr") ).attr( 'title', tooltip );
            }
}

function details()
{
    $( "table.table td:last-child > a:first-child" )
    .each(
        function(i,elem)
        {
            $.ajax( { type: "GET"
                    , async: false
                    , url: "https://polexp.com" + $( elem ).attr( "href" )
                    , beforeSend: function(xhr) { xhr.setRequestHeader('X-Requested-With', {toString: function(){ return ''; }}); }
                    , complete: callback( i, elem )
                    }
            );
        }
    );
}

function propNames( obj )
{
    if( !obj ) return "obj is undefined";
    var s = obj.toString() + ":";
    for( p in obj )
    {
        s += "\n" + p + "=" + obj[p];
    }
    return s;
}

function inspect( obj )
{
    alert( propNames(obj) );
}

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}