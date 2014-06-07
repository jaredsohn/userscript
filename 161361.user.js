// ==UserScript==
// @name        Nikkan WBC Tamer
// @namespace   @k_dsk
// @description 日刊スポーツのWBCテキスト速報を最新の状態に保ちます。
// @include     http://www.nikkansports.com/baseball/wbc/2013/news/*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @version     1.1
// @grant       none
// ==/UserScript==

jQuery(function($) {
    const INTERVAL = 20 * 1000;
    const CLASS = '.scoreBox';
    const ID = '#photo';

    var art = $(CLASS).html();
    var img = photo($(ID));
    setInterval(function() {
        $.get('', function(data) {
            var newart = $(CLASS, data).html();
            if (art != newart) {
                $(CLASS).html(newart);
                art = newart;
            }
            var newimg = photo($(ID, data));
            if (img != newimg) {
                $(ID).html( $(ID, data).html() );
                img = newimg;
            }
        });
    }, INTERVAL);

    function photo(obj) {
        return obj.find('img:eq(0)').attr('src');
    }

//    alert('done.');
});
