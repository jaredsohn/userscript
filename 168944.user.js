// ==UserScript==
// @name        Dealextreme - Product images in cart and order detail
// @description Shows product images in orders and the cart
// @version     1.0
// @copyright	2013+, Iddo
// @include     https://cart.dx.com/*
// @include     https://my.dx.com/MyOrders/OrderDetail/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
// ==/UserScript==


$(document).ready(function () {
    // Order details
    $('#order_ShipmentsInfo td:last-child').each(function () {
        var me = $(this), html = me.html(), items = html.split('<br>'), i, s, sku, qty, replacement = "";
        //        console.log("Splitting [" + html + "]");
        for (i=0; i<items.length; i++) {
            if (items[i].indexOf(':') != -1) {
                s = items[i].split(':');
                sku = s[1].replace( /\D/g, '');
                qty = s[2].replace( /\D/g, '');
//	            console.log("SKU: " + sku + " QTY: " + qty);
                replacement += '<a href="http://dx.com/p/' + sku + '"><img src="//img.dxcdn.com/productimages/sku_' + sku + '_1_small.jpg" style="width:30px;height:30px;" title="' + sku + '"/></a>x' + qty + '<br/>';
            }
        }
        me.html(replacement);
    });
    
    $('.items_table td:first-child a, table.cart td.sku').each(function () {
        var me = $(this), sku = $.trim(me.text());
        if (sku > 0) {
        	me.html('<img src="//img.dxcdn.com/productimages/sku_' + sku + '_1_small.jpg" style="width:30px;height:30px;" title="' + sku + '"/>');
        }
    });
});