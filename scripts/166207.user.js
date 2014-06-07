// ==UserScript==
// @name       United to Table
// @namespace  http://gedesuparsa.com/
// @version    0.1
// @description  does something useful to the unitedpetroleum site
// @match      http://www.unitedpetroleum.com.au/united/*
// @copyright  2013, Gede Suparsa
// @require http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js
// ==/UserScript==


$('<button type="button" id=tm_btn>Go</button>').appendTo('.list');
$('#tm_btn').click(function() {
    var table = $('<table></table>').addClass('foo');
    var resultSegment = $('#listcontainer li');
    resultSegment.each(function( i ) {
        if ($(this).find('a[id^="suburb_"]').text().length) {
            console.log(i + ": " + $(this).find('a').text() );
            console.log($(this).find('p[id^="address"]').text() );
            console.log($(this).find('p:eq(2)').text().replace("Phone: ","") );
            row = $('<tr></tr>').addClass('bar');
            d1 = $('<td></td>').text($(this).find('a').text());
            d2 = $('<td></td>').text($(this).find('p[id^="address"]').text());
            d3 = $('<td></td>').text($(this).find('p:eq(2)').text().replace("Phone: ",""));
            row.append(d1);
            row.append(d2);
            row.append(d3);
            table.append(row);
        }
    });
    $('.list').append(table);
});