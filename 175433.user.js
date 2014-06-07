// ==UserScript==
// @name          unhater
// @require       http://cdnjs.cloudflare.com/ajax/libs/sugar/1.3.9/sugar.min.js
// @include       http://0chan.hk/*
// ==/UserScript==

(function () {
    var detectors = ['хаскипету', 'хачкипету', 'хаскипиту', 'хачкипиту', 'шалом', '[золотце]'];
    $('td.reply').each(function () {
        var elem = $(this);
        var msg = elem.text().toLowerCase();
        if(detectors.some(function (d) { return msg.has(d); })) {
            elem.closest('div.postnode').hide();
        }
    });
})();
