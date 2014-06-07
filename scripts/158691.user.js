// ==UserScript==
// @name        Dealextreme - Show previous purchases
// @namespace   http://fjaer.com/grease/dx-previous-purchases
// @description Shows if the product you are watching has been previously purchased. Icon shown in product detail page, product catalog, product search and shopping cart. You need to maintain a manual list of previously purchased products (the SKUs) in order for this to work.
// @include     http://dx.com/*
// @include     https://cart.dx.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
// @version     1
// ==/UserScript==

$(document).ready(function () {

    var skuListUrl = GM_getValue('skuListUrl');
    if (skuListUrl === undefined) {
        unsafeWindow.setSkuListUrl();
        skuListUrl = GM_getValue('skuListUrl');
    }

    // Add "Set SKU list" to the account menu
    $('.account_display ul').append('<li><a href="javascript:window.setSkuListUrl();location.reload();">Set SKU list</a></li>');

    // Load SKUs -- Line separated text file
    GM_xmlhttpRequest({ method: "GET", url: skuListUrl,
        onload: function (response) {
            insertPreviousPurchaseIcon(response.responseText.split('\r\n'));
        }
    });
});


// Make Grease Monkey settings available to the document sand box
unsafeWindow.setSkuListUrl = function () {
    var value = prompt("SKU list URL", "URL to the line separated SKU list.");
    setTimeout(function () { GM_setValue("skuListUrl", value); }, 0);
}

// Add "Previous purchase" icon to various places
function insertPreviousPurchaseIcon(previousPurchases) {
    var previousPurchaseHtml = '<span style="background-image: url(//dx.com/Content/img/detail_icon.png); background-position: 0 -196px; background-repeat: no-repeat; padding-left: 20px; margin-left: 0px;line-height:18px;\'">Previous purchase</span>';

    if ($('#sku').is('*') && $.inArray($('#sku').html().trim(), previousPurchases) > -1) {
        $('.review_sku .review_rate').after(previousPurchaseHtml);
    }

    // Product list, Search result
    $("#proList .productList li, #s_product_list .pi").each(function () {
        var urlWithSku = $(this).find('.review a').prop('href').trim();
        var start = urlWithSku.indexOf('/text/') + 6;
        var sku = urlWithSku.substring(start);
        if ($.inArray(sku, previousPurchases) > -1) {
            $(this).find('.review').after(previousPurchaseHtml);
        }
    });

    // Shopping cart
    $("#shoppingcart .producttitlelink").each(function () {
        var urlWithSku = $(this).prop('href').trim();
        var start = urlWithSku.indexOf('/p/') + 3;
        var sku = urlWithSku.substring(start);
        if ($.inArray(sku, previousPurchases) > -1) {
            $(this).after(previousPurchaseHtml);
        }
    });
}
