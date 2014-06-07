// ==UserScript==
// @name         wants: add prices
// @description  https://github.com/solygen/userscripts/blob/master/doc/magickartenmarkt.de.md#wants-viewuserjs
// @version      0.0.1
// @icon         https://raw2.github.com/solygen/userscripts/master/doc/icon/icon_032.png
// @namespace    https://github.com/solygen/userscripts
// @repository   https://github.com/solygen/userscripts.git
// @license      MIT
// @require      https://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
//
// @include      https://www.magickartenmarkt.de/?mainPage=showWants*
// @include      https://www.magiccardmarket.eu/?mainPage=showWants*
// @include      https://fr.magiccardmarket.eu/?mainPage=showWants*
// @include      https://es.magiccardmarket.eu/?mainPage=showWants*
// @include      https://id.magiccardmarket.eu/?mainPage=showWants*
//
// @updateURL    https://rawgithub.com/solygen/userscripts/master/scripts-min/magickartenmarkt.de/wants-min.user.js
// @downloadURL  https://rawgithub.com/solygen/userscripts/master/scripts-min/magickartenmarkt.de/wants-min.user.js
// @homepage     https://github.com/solygen/userscripts

// ==/UserScript==

(function () {

    'use strict';
    
    var list = $($.find('.col_2')).find('a');
    
    //replace start price column with average price (sold) 
    $.each(list, function (index, value) {
        var $elem = $(value), 
            $row = $($elem.parent().parent()),
            name = $elem.text(),
            price = localStorage.getItem(name) || '';
        //set cell
        $row.find('.col_12')
            .text(price ? (price + '  €')
            .replace('.', ',') : '');
    });

    //adjust header (keep it sortable)
    var header = $('.headerCell_10')
        .html()
        .split('<');
    header[0] = '&empty;';
    $('.headerCell_12').html(header.join('<'));

})();
