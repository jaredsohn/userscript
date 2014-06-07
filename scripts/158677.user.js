// ==UserScript==
// @name        Dealextreme - Product images in cart and order detail
// @namespace   http://fjaer.com/grease/dx-order-image
// @description Shows product images in orders and the cart
// @include     https://cart.dx.com/*
// @include     https://my.dx.com/MyOrders/OrderDetail/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
// @grant       none
// @version     1.1
// ==/UserScript==

// Shopping cart
$('table .item .sku').each(function () {
    appendImage($(this), $(this).html().trim());
});

// Order details
$('.items_table tr td:first-child a').each(function () {
    appendImage($(this).parent(), $(this).html().trim());
});

function appendImage(td, itemId) {
    td.append('<img src="//img.dxcdn.com/productimages/sku_' + itemId + '_1_small.jpg" style="width:68px; height:68px;">');
}