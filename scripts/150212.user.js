// ==UserScript==
// @name        Clarify Amazon Used and New Prices
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js 
// @require     https://raw.github.com/jquery/globalize/10b6de8cfbb7458d23bbe25f662f22624a00fe31/lib/globalize.js
// @require     https://raw.github.com/jquery/globalize/10b6de8cfbb7458d23bbe25f662f22624a00fe31/lib/cultures/globalize.culture.en-US.js
// @require     https://raw.github.com/jquery/globalize/10b6de8cfbb7458d23bbe25f662f22624a00fe31/lib/cultures/globalize.culture.en-CA.js
// @require     https://raw.github.com/jquery/globalize/10b6de8cfbb7458d23bbe25f662f22624a00fe31/lib/cultures/globalize.culture.en-GB.js
// @require     https://raw.github.com/jquery/globalize/10b6de8cfbb7458d23bbe25f662f22624a00fe31/lib/cultures/globalize.culture.fr-FR.js
// @require     https://raw.github.com/jquery/globalize/10b6de8cfbb7458d23bbe25f662f22624a00fe31/lib/cultures/globalize.culture.de-DE.js
// @require     https://raw.github.com/jquery/globalize/10b6de8cfbb7458d23bbe25f662f22624a00fe31/lib/cultures/globalize.culture.it-IT.js
// @require     https://raw.github.com/jquery/globalize/10b6de8cfbb7458d23bbe25f662f22624a00fe31/lib/cultures/globalize.culture.es-ES.js
// @namespace   471461
// @description Update the price for 'used and new' items on the product page to include delivery/p&p. Shows each seller's full price (including delivery/p&p) on the Amazon 'used and new' tab. Shows prices inc delivery in search results too.
// @include     /^https?://www\.amazon\.(com|ca|co\.uk|fr|de|it|es)/((gp/(offer-listing|product)/)|(.+?/dp/.+?|dp)|s/).*$/
// @version     2.1
// @grant GM_addStyle
// ==/UserScript==
// Grant needed to workaround http://stackoverflow.com/questions/12146445/jquery-in-greasemonkey-1-0-conflicts-with-websites-using-jquery

// Disclaimer: Neither the author or script are in any way affiliated with Amazon.com, Inc.

jQuery(document).ready(function($) {
        // Locales for each of the amazon sites
        var locales = {'com': 'en-US',
        'ca': 'en-CA',
        'co.uk': 'en-GB',
        'fr': 'fr-FR',
        'de': 'de-DE',
        'it': 'it-IT',
        'es': 'es-ES'};

        // Amazon formats EUR differently than the default, change the european locales to reflect this
        var euroLocales = ['fr', 'de', 'it', 'es'];
        for( var i = 0; i < euroLocales.length; i++ ) {
        var loc = Globalize.culture( locales[euroLocales[i]] );
        loc.numberFormat.currency.symbol = 'EUR';
        loc.numberFormat.currency.pattern = ['$ -n', '$ n'];
        }

        // Identifier stem for certain page elements added by this script
        var clarifyStem = 'clarify_grease_';
        // Regex to match the used and new page containing prices for a specific condition
        var usedNewUrlRegex = /^.*?\/gp\/offer-listing\/(.+?)\/.+condition=([^&]+)/;

        // Determine which locale to used based on the TLD
        var locale = locales[/www\.amazon\.([^\/]+)/.exec(window.location.host)[1]];
        Globalize.culture(locale);

        // Check page type to perform appropriate action
        if( window.location.pathname.indexOf('/gp/offer-listing') === 0 ) {
            usedNewPage();
        } else if( window.location.pathname.indexOf('/s/') === 0 ) {	
            searchPage();
        } else {
            productPage();
        }

        function searchPage() {
            var i = 0;
            $('ul.rsltL').each(function() {
                    var listItems = $('li.mkp2', this);
                    if( listItems.length < 1 ) {
                    return;
                    }
                    var firstLi = $(listItems[0]);
                    var id = clarifyStem + i;

                    // Add the button for getting the full price
                    firstLi.html( firstLi.html() + '<button id="' + id + '" style="font-style: italic; border: none; background: none; color: #888888; text-decoration: underline; font-size: 90%;">Get price inc. P&P</button>' );

                    // Set up event listener for clicking the button
                    $('#' + id).click(function() { fetchSearchResultPrice($('#' + id)); });

                    i++;
                    });
        }

        function fetchSearchResultPrice(btnElem) {
            function removeLoadingText() {
                // Remove loading text if it's still there (will get removed by first successful AJAX call)
                if( $('#' + btnId).length ) { 
                    $('#' + btnId).remove(); 
                }
            }

            var btnId = btnElem.attr('id');

            // Get all list items containing used and new prices
            var listItems = $.merge([btnElem.parent()], btnElem.parent().siblings('li.mkp2'));

            // Set the button/link to loading text
            btnElem.unbind('click');
            btnElem.replaceWith( '<span id="' + btnId + '" style="font-style: italic; font-size: 90%; color: #888888;">Loading...</span>' );

            // Get the full price for each list item
            $.each(listItems, function(index, elem) {
                    // If there's no link to a used and new page, remove the loading text and exit
                    if( $('a', elem).length !== 1 || usedNewUrlRegex.exec($('a', elem).attr('href')) === null ) {
                    removeLoadingText();
                    return;
                    }

                    $.ajax({
url: $('a', elem).attr('href'),
dataType: 'html',
success: function(data) {
var parseResult = parseFirstRow(data);
updatePrice(elem, getPriceHtml(parseResult));
},
complete: function() {
removeLoadingText();
}
});
                    });
}

function usedNewPage() {
    $('tbody.result, div.olpOffer').each(function() {
            parseAndUpdatePriceRow(this);
            });

}

function getPriceHtml(parseResult) {
    return ' <i>(' + Globalize.format(parseResult.totalPrice, 'c') + ' inc. P&P)</i>';
}

// Event handler for when price is fetched, object will be updated with incHtml which is the price addition
function updatePrice(obj, incHtml) {
    if(obj.hasClass('buyAction')) {
        // Text is not actually stored in the link for these
        $('span.price', obj.parent()).html($('span.price', obj.parent()).html() + incHtml);
    } else {
        obj.html(obj.html() + incHtml);
    }
}

function productPage() {
    // Keyed by productID_condition
    var prodObjs = {};

    // Get all the URLs that need to be fetched and which objects need to be updated
    // for AJAX event handling and to ensure pages aren't fetched more than once unnecessarily
    $('#olpDivId span.olpCondLink > a, td.tmm_olpLinks > a').each(function() {
            // Attempt to match the productID and condition in the URL
            var fetchedUrl = $(this).attr('href');
            var urlMatchFetched = usedNewUrlRegex.exec(fetchedUrl);
            if( urlMatchFetched === null ) {
            return;
            }
            var key = urlMatchFetched[1] + '_' + urlMatchFetched[2];

            if( typeof(prodObjs[key]) === 'undefined' ) {
            prodObjs[key] = {};
            prodObjs[key].elems = [];
            prodObjs[key].url = fetchedUrl;
            } 

            // This element will need to be updated
            prodObjs[key].elems.push($(this));
            });

    var ajaxCalls = [];
    // Get all the prices necessary
    $.each(prodObjs, function(key, obj) {
            // Get the price information from the usednew page
            ajaxCalls.push($.ajax({
url: obj.url,
dataType: 'html',
success: function(data) {
// Get the total price from the first row of the used/new page
var parseResult = parseFirstRow(data);

if( parseResult !== null ) {						
obj.totalPrice = parseResult.totalPrice;
for( var i = 0; i < obj.elems.length; i++ ) {
// Update prices on page
updatePrice( obj.elems[i], getPriceHtml(parseResult) );
}
}
}
}));
            });

// Highlight lowest used/new prices
// Thanks to http://stackoverflow.com/a/5627301/727357 for when syntax
$.when.apply(null, ajaxCalls).done(function() {
        // Find minimum price
        var minKey = null;
        var min = Number.MAX_VALUE;
        $.each(prodObjs, function(key, obj) {
            if( obj.totalPrice < min ) {
            minKey = key;
            min = obj.totalPrice;
            }
            });

        var obj = prodObjs[minKey];
        // Highlight lowest prices
        for( var i = 0; i < obj.elems.length; i++ ) {
        var elem = obj.elems[i];
        if(elem.hasClass('buyAction')) {
        $('span.price', elem.parent()).html('<b>' + $('span.price', elem.parent()).html() + '</b>');
        } else {
        elem.html('<b>' + elem.html() + '</b>');
        }
        }
});
}

// Convenience method to parse the first price row of the used and new page
function parseFirstRow(pageHtml) {
    var page = $(pageHtml);
    var rows = $('tbody.result, div.olpOffer', page);
    if( rows.length < 1 ) {
        return null;
    }
    var row = rows[0];
    return parseAndUpdatePriceRow(row);
}

// Parse the price and currency symbol from a row in the used and new page table
function parseAndUpdatePriceRow(row) {
    var priceSpan = null;
    var priceShippingSpan = null;

    // Match different styles of usednew pages
    if( $('span.price', row).length > 0 ) {
        priceSpan = $('span.price', row);
        priceShippingSpan = $('span.price_shipping', row);
    } else if( $('span.olpOfferPrice', row).length > 0 ) {
        priceSpan = $('span.olpOfferPrice', row);
        priceShippingSpan = $('span.olpShippingPrice', row);
    } else {
        return null;
    }

    // In the case of items with no delivery price specified (eg. Amazon fulfilled) assume free delivery
    var priceDelivery = 0;

    // Determine the currency symbol from the start of the price string
    var priceRegex = /^\s*(^\D+)(\S+)/;
    var priceMatch = priceRegex.exec(priceSpan.html());

    var price = Globalize.parseFloat(priceMatch[2]);
    if( priceShippingSpan.length > 0 ) {
        priceDelivery = Globalize.parseFloat(priceRegex.exec(priceShippingSpan.html())[2]);
    }

    var parseResult = {
        'price': price,
        'totalPrice': price + priceDelivery, 
    };

    priceSpan.html(priceSpan.html() + getPriceHtml(parseResult));

    return parseResult;
}
});
