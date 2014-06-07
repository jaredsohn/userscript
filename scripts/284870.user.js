// ==UserScript==
// @name         deck view: different tweaks
// @description  deckstats.net
// @version      0.0.1
// @icon         https://raw2.github.com/solygen/userscripts/master/doc/icon/icon_032.png
// @namespace    https://github.com/solygen/userscripts
// @repository   https://github.com/solygen/userscripts.git
// @license      MIT
// @require      https://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
//
// @include      http://deckstats.net/decks/*
//
// @updateURL    https://rawgithub.com/solygen/userscripts/master/scripts-min/deckstats.net/deck-view-min.user.js
// @downloadURL  https://rawgithub.com/solygen/userscripts/master/scripts-min/deckstats.net/deck-view-min.user.js
// @homepage     https://github.com/solygen/userscripts

// ==/UserScript==

(function () {

    'use strict';

    var RARE = 'rgb(196, 159, 39)',
        UNCOMMON = 'rgb(119, 119, 119)',
        COMMON = 'rgb(0, 0, 0)',
        MYTHIC = 'rgb(132, 47, 7)',
        BASIC = 'rgb(4, 26, 72)',
        current = {},
        data = {
            proxies: [],
            rarity: {
                rare: [],
                uncommon: [],
                common: [],
                mythic: [],
                basic: []
            }
        };

    var page = {
        remove: function () {
            var table = $('.cardtable');
            //remove flag and sum
            $(table.find('.card_price.header')[1]).empty();
            $(table.find('.deck_footer').find('.card_price')[1]).empty();

        },

        set: function () {
            //set banner link to list view
            var listview = $($('ul#user_menu a')[0]).attr('href');
            if (listview)
                $($('#header_left a')).attr('href', listview);
        },


        //bigger card preview
        register: function () {
            var id = setInterval(function () {
                    $('#kartenOverlay')
                        .css('border', '0px')
                        .css('width', 'auto');
                    $('#kartenOverlayBild')
                        .css('height', '380px')
                        .css('width', '266px');
                    $('#kartenOverlayContent')
                        .css('display', 'none');
                    if ($('#kartenOverlay').length) {
                        clearInterval(id);
                    }
                }, 1000);
        },

        //replace link
        replace: function () {
            var list = $('a.cardlink');
            for (var i = 0; i < list.length; i++) {
                var link = $(list[i]),
                    href = link.attr('href'),
                    card = href.split('=').pop(),
                    newl = 'https://www.magickartenmarkt.de/?mainPage=showSearchResult&searchFor=' + card + '&v=card&s=cname&card=' + card + '&redirect=true&referrer=solygen';
                link.attr('href', newl);
            }

        },

        tab: function () {
            //TODO: own tab
            // var bar = $('.ui-tabs-nav'),
            //     tab = $(bar.children()[1]).clone(),
            //     tabcontent = $('#deck_tabs-spoiler').clone();
            // //set tab link
            // tab.find('a')
            //     .attr('href', '#deck_tabs-proxies')
            //     .text('Proxies (' + data.proxies.length +  ')');

            // $(tab.find('a'))
            //     .on('click', function () {
            //         $('.ui-tabs-panel').hide();
            //         $('#deck_tabs-proxies').show();
            //     });

            // //listener
            // var others = $('.ui-tabs-nav').find('a'),
            //     fn = function () {
            //             $('#deck_tabs-proxies').hide();
            //         };
            // for (var i = 0; i < others.length; i++) {
            //     var tmp = $(others[i]);
            //     if (tmp.attr('href') !== '#deck_tabs-proxies') {
            //         tmp.on('click', fn);
            //     }
            // }

            // //insert
            // tab.insertAfter($(bar.children()[1]));

            // tabcontent.attr('id', 'deck_tabs-proxies').find('.inhalt').empty();

            // //create tab content
            // $('#deck_tabs').append(tabcontent);
            //write proxie block
            if (data.proxies.length) {
                data.proxies.sort(function (a, b) {
                    return a.substr(2, 1).charCodeAt(0) - b.substr(2, 1).charCodeAt(0);
                });
                $('.custom').remove();
                var node = $($('div.ui-widget')[1]).clone();
                //set content
                $(node.find('p')[0]).empty()
                                    .append(data.proxies.join('<br>'));
                //remove title and add bottom margin
                node.attr('title', '')
                    .css('margin', '1em .5em');
                //prepend to main container
                $('.inhalt').prepend(node.addClass('custom'));
            }
        },

        process: function () {
            this.remove();
            this.set();
            this.register();
            this.replace();
            this.tab();
        }
    };

    var cards = {

        //update rarity
        rarity: function () {
            if (current.color === RARE)
                data.rarity.rare.push(current.num + ' ' + current.name);
            if (current.color === UNCOMMON)
                data.rarity.uncommon.push(current.num + ' ' + current.name);
            if (current.color === COMMON)
                data.rarity.common.push(current.num + ' ' + current.name);
            if (current.color === MYTHIC)
                data.rarity.mythic.push(current.num + ' ' + current.name);
            if (current.color === BASIC)
                data.rarity.basic.push(current.num + ' ' + current.name);
        },

        //reorder edition column
        reorder: function () {
            var cell = $($(current.row.find('.info_link'))[0]),
                span = cell.find('span').remove(),
                leg = cell.text().trim().replace('(', '').replace(')', '').trim();
            span.text(span.text().trim());
            cell.text(leg + ' (')
                .append(span)
                .append(')');
            //update rarity statistics
            this.rarity(span.css('color'), current.num, current.name);
        },

        //identify proxies
        identify: function () {
            var comment = current.comment;
            if (comment && (comment.length === 1 || comment === 'proxy')) {
                $(current.row.find('.hbtronix_icon')[0])
                    .prop('src', 'http://i.hbtronix.de/picture_empty.png')
                    .css('height', '11px')
                    .css('width', '11px');

                if (comment.length === 1)
                    data.proxies.push(comment + ' ' + current.name);
                else
                    data.proxies.push(current.num + ' ' + current.name);
            }
        },

        //replace us price
        price: function () {
            $(current.row.find('.card_price')[1]).text(current.each + ' \u20AC');
        },

        process: function () {
            var rows = $('.cardtable').find('tr.deck_card');
            for (var i = 0; i < rows.length; i++) {
                var row = $(rows[i]);
                current = {
                    row: row,
                    price: $(row.find('.card_price')[0]).text().trim().replace('\u20AC', ''),
                    num: $(row.find('.card_amount')[0]).text().trim(),
                    name: $(row.find('a')[0]).text().trim(),
                    comment: $(row.find('.hbtronix_icon')[0]).attr('title'),
                    color: $($(row.find('.info_link'))[0]).find('span').css('color')
                };
                current.each = (current.price / current.num).toFixed(2);

                this.price();
                this.identify();
                this.reorder();
            }
        }
    };

    return {
        run: function () {
            cards.process();
            page.process();
        }

    };
})().run();
