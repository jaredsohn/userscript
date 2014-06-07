//
// Copyright © 2013 Mariusz Pluciński
// All Rights Reserved
// http://mplucinski.com
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
//   * Redistributions of source code must retain the above copyright notice,
//     this list of conditions and the following disclaimer.
//   * Redistributions in binary form must reproduce the above copyright notice,
//     this list of conditions and the following disclaimer in documentation
//     and/or other materials provided with the distribution.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
// AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
// ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
// LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
// CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
// SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
// CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
// ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
// POSSIBILITY OF SUCH DAMAGE.
//
// ==UserScript==
// @name        Allegro.pl - wyróżnij cenę z dostawą
// @version     1.0
// @description Wyróżnia "cenę z dostawą" na liście ofert w Allegro.pl (zamiast domyślnie wyróżnionej ceny bez dostawy)
// @namespace   http://www.mplucinski.com/greasemonkey
// @downloadURL http://www.mplucinski.com/greasemonkey/allegro-ceny.user.js
// @include     http://allegro.pl/*
// @include     http://www.allegro.pl/*
// @require     http://code.jquery.com/jquery-1.9.1.min.js
// ==/UserScript==
//

function reorderPrices() {
//    console.log('reorder prices...');

    elem = $('div.main-content');
    elem = elem.find('div.listing');
    elem = elem.find('section.offers');
    elem = elem.find('article.offer');
    elem = elem.find('div.price');
    elem.each(function(index) {
        var buynow = $(this).find('span.dist');
        buynow.css({
            'color': '#7F7F7F',
            'font-size': '12px',
            'font-weight': '400',
        });
        buynow.find('span.currency').css('font-size', '12px');
        buynow.detach();
        $(this).append(buynow);

        var delivery = $(this).find('span.delivery')
        delivery.css({
            'color': '#303030',
            'font-size': '24px',
            'font-weight': '700',
        });

    });
//    console.log('reorder prices done');
}

//console.log('Allegro reorder prices script');

window.allegro_needs_reorder = true;
window.setInterval(function() {
    if(window.allegro_needs_reorder === true) {
        reorderPrices();
        window.allegro_needs_reorder = false;
    }
}, 200);

$(document).on('DOMSubtreeModified', function() {
//    console.log('Needs reorder...');
    window.allegro_needs_reorder = true;
});
