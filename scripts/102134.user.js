// ==UserScript==

// @name           azimut.com.ua: always by price ordering

// @namespace      tuning-up

// @require http://code.jquery.com/jquery-1.5.2.min.js

// @description    Реализует сортировку по цене по умолчанию

// @include        http://www.azimut.com.ua/*

// @version        1.1
// ==/UserScript==

var config = jQuery('.productListing>tbody>tr[class^=pro]').map(function (index, tr) {

var price = parseInt(jQuery(tr).find('td:nth-child(3)').text().replace(/[, ]/g,''));

return {

    row: tr,

    price: price,

    parent: tr.parentNode

};

});

config.sort(function (el1, el2) {

    return el1.price == el2.price? 0: (el1.price> el2.price? 1: -1);

})

config.each(function (index, el) {

    jQuery(el.row).detach();

});

config.each(function (index, el) {

    jQuery(el.parent).append(el.row);

});