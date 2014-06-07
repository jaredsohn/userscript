// ==UserScript==
// @name AmazonInStock
// @description used with RefreshEvery to alert if product on current page in stock
// @include http://www.amazon.com/*
// ==/UserScript==


//var thisElement = document.getElementById('addToCartSpan');

(function () {
    if(document.getElementById('addToCartSpan')) {
        alert("Product in stock at Amazon.com!");
        var formElement = document.getElementById('handleBuy');
        formElement.submit();
    }
}
)();