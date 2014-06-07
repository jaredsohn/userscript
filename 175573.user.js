// ==UserScript==
// @name       FI Data Getter
// @namespace  https://github.com/aggieben
// @version    0.1
// @description  Download table of transactions as OFX
// @match      https://*.ibsnetaccess.com/*
// @copyright  2013+, Benjamin Collins
// @require		http://code.jquery.com/jquery-1.10.2.min.js
// @require		https://raw.github.com/alexei/sprintf.js/master/src/sprintf.min.js
// ==/UserScript==

var ofxLogoUri = "data:image/gif;base64,R0lGODlhSQBFAMT/AP///3PGjCGlSgCcMTGtWhCcQpzetb3nznvOnO//987v3u///5ze73vO5wCcziGl1hCczgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAASQBFAEAF/yAgjmRpnmiqrmzrjkM8vHQ9Mo+jO6w8rzvHg2E7BY9CYskg8DmfA4HBhEMGa1dYdFpiQJDD6hHSWCybg8MoW0QxoT8RGwAvIBJt0tsp7clIcz5qKggFT3Z5VDlHQ3I7ImJBjYmUlZaXKT6Ymy6anC2RO5N6AnZ4JJ4jCYV9XV+MSi9zkK+SsSNMrSShOmSna4+Xez66wDomwzKmn8kxxakAgTKDAM0Dyy4BxZWziauInze1Yw2/4efo6ah/6ujQ7Zzv8KAPfjEso5+8SfZxKfv5sMBChsbHMk3fnmwDsE/gMYaLbBGEs3AfGTPdgARDAfDWrog7LqbIqCIgHT5cPv9acSCS1BNqkOoxK8jO0UMRh+7MsyYFmrQY2nKaa8MzZQmfG0/GgImLZgxsKJwuVLEHUNKnOlsk9EHg0oIGEEx2w9Fynop9K3t5NFuDbBm2cOPKnbvuHl1K8u7WyKv3Bd++Lf4CXiFYrph+LHSYxNSQcM2RAyt17PT4LEjFa1uAWZsMaqqtzozGROIwsksndnwUUiga4srSXjZPhCOj4mWWDUhCvunadFNirS2+tcmDBsnJK4QPJV6ahG3ZN26XFcGEmm4UmOtuUZQ25PDf06LzzlOUu3czpw0GWD6TtVXe1qCatfa+OE7U69laQ8qb9rWs7aF0n13MabFUNU79x15UDeUd9dhPaZwhFA0NosCffUpF6EaC8qVXW2sWPnhVeCuA9mEJB5xYBBP1kdChVqvFoAA81+kFlkTGYBgKGXp1FARyg/XW3WJBiufdgkUmqeSSm4QAADs=";
var ynabLogoUri = "data:image/x-icon;base64,AAABAAEAEBAAAAAAAABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAADGcw4GxnMOkcZzDu7Gcw7/xnMO/8ZzDv/Gcw7/xnMO/8ZzDv/Gcw7/xnMO/8ZzDv/Gcw7/xnMO7sZzDpHGcw4GyHcOkMh3Dv/Idw7/yHcO/8h3Dv/JeA7/yXoP/8t8D//LfA//y3wP/8p6D//IeA7/yHcO/8h3Dv/Idw7/yHcOicp6D+3Keg//ynoP/8p6D//Keg//y3wP/4ZUCv96Twr/f1QL/5FfDP/PghH/y3wP/8p6D//Keg//ynoP/8p6D+3Nfw//zX8P/81/D//Nfw//y34P/8l9D//g08H////////////l2cL/04kR/8+CEP/Nfw//zX8P/81/D//Nfw//z4QQ/8+EEP/PhBD/z4QQ/8uBEP/Aew//3tPC////////////5NjD/9SMEv/QhxH/z4QQ/8+EEP/PhBD/z4QQ/9OJEf/TiRH/04kR/9OJEf/NhRH/wX0Q/93Twv///////////+PYw//XkRP/1IwS/9OJEf/TiRH/04kR/9OJEf/WjxH/1o8R/9aPEf/WjxH/0owR/7B2Dv/b1Mb////////////h2cf/xooS/9mUEv/XkBH/1o8R/9aPEf/WjxH/2JQR/9iUEf/YlBH/2JQR/9COEf+VeUT//v79/////////////v79/6yMR//YmhT/2pgS/9iUEf/YlBH/2JQR/9yZE//cmRP/3JkT/9yZE/+ccRn/7ejg///////////////////////w6+D/r4Qd/+ChFf/dmxT/3JkT/9yZE//fnxP/358T/9+fE/+7hRD/yLyh////////////+fbv//n27////////////9PFo//HlBP/4qQV/+CgE//fnxP/4qQU/+KkFP/WmxP/ooxY/////////////////9+9b//Xt27/////////////////tZxa/92mFv/kqBX/4qUU/+WpFP/hphT/mHYi//Px7P////////////Lmx//RmhP/wY4S/+vhxv////////////Xz7P+phib/560V/+WqFP/nrRX/2qQU//Dhuf////////////79+v/fsTz/2qQU/86aE//IoDf//fz4////////////+Oa5/+iuFf/nrhX/6bEW7dunFf/OnBP/xJUT/8SVE//PnhT/3agV/+StFf/dqBX/z54U/8SVE//ElRL/zpwT/9unFf/lrhb/6bEW7eu0FpDrtBb/67QW/+u0Fv/rtBb/67QW/+u0Fv/rtBb/67QW/+u0Fv/rtBb/67QW/+u0Fv/rtBb/67QW/+u0FojttxYG7bcWke23Fu3ttxb/7bcW/+23Fv/ttxb/7bcW/+23Fv/ttxb/7bcW/+23Fv/ttxb/7bcW7u23FpHttxYGgAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAEAAA==";

// for FIA Card Services
var $headerTable = $('table.registermodule');
var $transTable = $('table.acctregistermodule');

if (!$transTable.length)
    return;

function downloadWithName(uri, name) {
    var link = $('<a/>');
    link.attr('download', name);
    link.attr('href', uri);
    link.trigger('click');
}

function getYnabCsv () {
    var csvData = "Date,Payee,Category,Memo,Outflow,Inflow\n";
    var transactions = $('tr', $transTable).filter(function(index) {
        return Date.parse($('td:first-child', this).text()) && $('td:nth-child(5)', this).text().trim() != "TEMP";
    });
    
    GM_log(sprintf('found %d transactions', transactions.length));
    
    transactions.each(function(index) {
        var tdate = $('td:first-child', this).text();
        if (tdate != '&nbsp;') {
            var desc = $('td:nth-child(3)', this).text().replace(/[,\x01-\x1a\n]/g, '').replace(/\s{2,}/g, ' ').trim(),
                amt = parseFloat($('td:nth-child(6)', this).text().replace(/[^0-9\.]+/g,"")),
                inflow = amt && amt < 0 ? -1*amt : '',
                outflow = amt && amt > 0 ? amt : ''
            ;
            
            var newCsvRow = sprintf("%s,%s,,%s,%s,%s\n", tdate, desc, desc, outflow, inflow)
            csvData += newCsvRow;
        }
    });
    
    var csvUri = 'data:text/csv,' + encodeURIComponent(csvData);
    window.open(csvUri);
}

GM_log("FI Data Getter Enabled");
var row = $('tr:first-child', $headerTable);
GM_addStyle('a#ofxLink img { height: ' + row.css('height') + '; } a#ofxLink:hover { cursor: pointer; }');
row.append('<th class="rightmodheader"><a id="ofxLink" title="Download Data"><img src="' + ynabLogoUri + '"/></a></th>');
$('a#ofxLink').click(getYnabCsv);


