// ==UserScript==
// @name       Ebay Auction ID
// @namespace  http://popeen.com
// @version    0.1
// @description  Shows the auction ID in an easy to read format. Good for third party tools that require you to enter the ID manually
// @include     *ebay.com/itm/*
// ==/UserScript==

function spacyfy( num ) {
    var str = num;
    if (str.length >= 5) {
        str = str.replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
    }
    return str;
}

var temp = document.getElementsByClassName('iti-act-num');
var id = spacyfy(temp[0].innerHTML);

var shippingSummary = document.getElementById("shippingSummary");
shippingSummary.innerHTML = '<h1 style="margin-left:30px; padding-top:5px;">Auction ID: ' + id + "</h1>" + shippingSummary.innerHTML;