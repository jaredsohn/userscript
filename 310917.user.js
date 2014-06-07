// ==UserScript==
// @name       Amazon ASIN Links
// @namespace  http://cbaoth.yav.in
// @version    0.2
// @description  Adds direct amazon, mein-wunschpreis.com, snip-it.de, and amapsys.de links to amazon product pages.
// @include     *//*amazon.*/*
// @run-at      document-end
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.js
// ==/UserScript==

/**
 * This script adds a few links to each amazon product page:
 * 1. A direct (clean) link to the product page which can be used e.g. to share (copy & paste)
 *    a product page without session information etc.:
 *      http://amazon.[TLD]/dp/[ASIN]
 * 2. A link to the current product on "Mein-Wunschpreis":
 *      http://www.mein-wunschpreis.com/artikel.php?ASIN=[ASIN]
 * 3. A link to the current product on "Snip-It"
 *      http://www.snip-me.de/preisentwicklung/[ASIN].aspx
 * 4. A link to the current product on "Amapsys"
 *      http://www.amapsys.de/zeige-produkt-[ASIN].htm
 **/
(function () {
    
    // config
    var SHOW_LINK_ICON = 1; // toggle link fav icons
    var LINK_STYLE = "font-weight: bold; font-style: italic;";

    // not all pages have fav icons so the following currently makes no sense
    var SHOW_LINK_TEXT = 1; // toggle link text

    if (! $('input#ASIN:first').length) {
        return; // this doesn't seem to be a product page
    }

    // get the ASIN (product id)
    var asin = $('input#ASIN:first').val();

    // get top level domain (the simple way)
    var tld = document.domain.split('.').pop();
    if ([ 'au', 'br', 'mx' ].indexOf(tld) > -1) { // add .com to some domaains
        tld = 'com.'+tld;
    } else if ([ 'uk', 'jp' ].indexOf(tld) > -1) { // add .co to others
        tld = 'co.'+tld;
    }

    // create all new links
        
    // direct link
    var link1url = '';
    var link1 = '';
    if (tld != undefined) { // add only if TLD was identified
        var tooltip = (tld == 'de' ? 'Direkter und sauberer Produktlink.' : 'Direct and clean product link.');
        link1url = 'http://amazon.' + tld + '/dp/' + asin;
        link1 = (SHOW_LINK_ICON ? '<img src="http://www.amazon.'+tld+'/favicon.ico" border="0" align="absmiddle" width="16" height="16" />&nbsp;' : '')
                + '<a target="_blank" href="http://amazon.' + tld + '/dp/' + asin + '" style="color: #e47911;' + LINK_STYLE + '" title="' + tooltip + '">'
                + (SHOW_LINK_TEXT ? (tld == 'de' ? 'Direkter Link' : 'Direct link') : '')
                + '</a> / ';
    }
    // mein-wunschpreis.com    
    var link2url = 'http://www.mein-wunschpreis.com/artikel.php?ASIN=' + asin;
    //var link2 = (SHOW_LINK_ICON ? '<img src="http://www.mein-wunschpreis.com/favicon.ico" border="0" align="absmiddle" width="16" height="16" />&nbsp;' : '')
    var link2 = '<a target="_blank" href="' + link2url + '" style="color: #039;' + LINK_STYLE + '">'
                + (SHOW_LINK_TEXT ? 'Mein-Wunschpreis' : '') + '</a> / ';
    // snip-me.de
    var link3url = 'http://www.snip-me.de/preisentwicklung/' + asin + '.aspx';
    //var link3 = (SHOW_LINK_ICON ? '<img src="http://www.snip-me.de/favicon.ico" border="0" align="absmiddle" width="16" height="16" />&nbsp;' : '')
    var link3 = '<a target="_blank" href="' + link3url + '" style="color:  #106bcc;' + LINK_STYLE + '">'
                + (SHOW_LINK_TEXT ? 'Snip-Me' : '') + '</a> / ';
    // amapsys.de
    var link4url = 'http://www.amapsys.de/zeige-produkt-'+ asin +'.htm';
    var link4 = (SHOW_LINK_ICON ? '<img src="http://www.amapsys.de/favicon.ico" border="0" align="absmiddle" width="16" height="16" />&nbsp;' : '')
                + '<a target="_blank" href="' + link4url + '" style="color:  #900;' + LINK_STYLE + '">'
                + (SHOW_LINK_TEXT ? 'Amapsys' : '') + '</a>';

    // add the links as new table row below the price information
    $('table.product > tbody:last > tr:last, table.a-lineitem > tbody:last > tr:last').after('<tr><td></td><td>'+link1+link2+link3+link4+'</td></tr>');

})();