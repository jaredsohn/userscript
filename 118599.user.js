// ==UserScript==
// @name           Never Subscribe Mail at Rakuten Order
// @namespace      http://exoego.net
// @include        https://*.step.rakuten.co.jp/rms/mall/*
// ==/UserScript==

var checkboxes = document.querySelectorAll('input[type="checkbox"]')
var blacklist = {
    "shop_rating_check": true,
    "rmail_check": true
};
function isNewsMailRelated(name){
    return name && (name in blacklist || name.indexOf("news") == 0);
};
Array.forEach(checkboxes, function(e){
    var name = e.name;
    if (isNewsMailRelated(name)) {
        e.checked = false;
    }
});
