// ==UserScript==
// @name         browse view: cleaner view by hiding duplicate name information
// @description  https://github.com/solygen/userscripts/blob/master/doc/magickartenmarkt.de.md#browser-viewuserjs
// @version      0.0.1
// @icon         https://raw2.github.com/solygen/userscripts/master/doc/icon/icon_032.png
// @namespace    https://github.com/solygen/userscripts
// @repository   https://github.com/solygen/userscripts.git
// @license      MIT
// @require      https://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
//
// @include      https://www.magickartenmarkt.de/?mainPage=browseUserProducts*
// @include      https://www.magiccardmarket.eu/?mainPage=browseUserProducts*
// @include      https://fr.magiccardmarket.eu/?mainPage=browseUserProducts*
// @include      https://es.magiccardmarket.eu/?mainPage=browseUserProducts*
// @include      https://id.magiccardmarket.eu/?mainPage=browseUserProducts*
//
// @updateURL    https://rawgithub.com/solygen/userscripts/master/scripts-min/magickartenmarkt.de/browse-view-min.user.js
// @downloadURL  https://rawgithub.com/solygen/userscripts/master/scripts-min/magickartenmarkt.de/browse-view-min.user.js
// @homepage     https://github.com/solygen/userscripts

// ==/UserScript==

(function () {

    'use strict';

    var $summary = $('.navBarTopText').length ? $($('.navBarTopText').children()[0]) : $($('#siteContents').children()[2]),
        $table = $('tbody'),
        $rows = $('tbody').find('tr'),
        list,
        hits = 0,
        //flag green
        tolerance = 0.1,
        pricelevel = [],
        lastname;
 
    //sort cards (name, price)
    (function sortCards() {
        $rows.sort(function(a, b){   
            function getKey(node) {
                var price = parseFloat($(node).find('.col_9').text().trim(), 10),
                    $node = $(node);
                //consider playset
                if ($node.find('.col_7').find('img').size())
                    price = price / 4;
                //hack: +1000 to get right sort order (e.g. 8, 12, 102)
                return $node.find('.col_2').text() + price + 1000;
            }
            var keyA = getKey(a),
                keyB = getKey(b);
            return keyA.localeCompare(keyB);
        });
    }());

    //apply order
    (function applyOrder() {
        $table.empty();
        $.each($rows, function (index, row){
            $table.append(row);
        });
    }());
    
    //add column header
    (function addColumnHeader() {
        var header = $('.col_price').clone();
        header
            .removeClass('col_price')
            .addClass('col_price_sold')
            .html('&empty;')
            .insertBefore($('.col_price'));
        //expand footer row
        $('.footerCell_0').attr('colspan', 13);
    }());


    function addCell(row) {
        var cell = row.find('.col_9').clone();
        cell
            .removeClass('col_9')
            .addClass('col_9a')
            .insertBefore(row.find('.col_9'));
    }

    function colorizePrice(price, saleprice, row) {
        if (!price) {
            return;
        } else if (saleprice <= parseFloat(price, 10) + tolerance) {
            row.find('.col_9').css('color', 'green');
        } else {
            row.find('.col_9').css('color', 'red');
        }
    }

    function getSalePrice($row) {
        var salesprice = $row
                            .find('.col_9')
                            .text()
                            .replace(',', '.')
                            .replace('€', '')
                            .trim();
        return parseFloat(salesprice, 10);
    }

    function setLevel() {
        var level,
            sum = 0;
        //sum
        $.each(pricelevel, function() {
            sum += parseFloat(this) || 0;
        });
        //average
        level = Math.round(sum/pricelevel.length*100)/100;
        //add level to dom
        $('.H1_PageTitle').text($('.H1_PageTitle').text() + ' (' + level + ')');
    }

    //process entries
    list = $($.find('.col_2')).find('a');
    $.each(list, function (index, value) {
        var $namecell = $(value),
            $row = $($namecell.parent().parent()),
            name = $namecell.text(),
            price = localStorage.getItem(name),
            salesprice = getSalePrice($row);
        
        //consider playset
        if ($row.find('.col_7').find('img').size())
            salesprice = salesprice / 4;

        //average price (sold)
        addCell($row);
        colorizePrice(price, salesprice, $row);

        //set content of new cell and apply style
        if (name === lastname) {
            $namecell.empty();
            $row.css('font-weight', 100)
                .find('.col_9a').empty();
        } else {
            hits++;
            pricelevel.push(salesprice / (price || salesprice));
            $row.find('.col_9a')
                .text(price ? (price + '  €')
                .replace('.', ',') : '');
        } 
        //remember name
        lastname = name;
    });

    
    //show price level
    setLevel();

    //update hits value
    $summary.text(hits + ' hits');
})();
