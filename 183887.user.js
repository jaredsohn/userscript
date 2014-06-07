// ==UserScript==
// @name       Adminer Human Readable Sizes
// @namespace  https://ge1.me/userscript-adminerhumanreadablesizes
// @version    0.3
// @description Format sizes in KB, MB, GB or TB.
// @include    http://example.com/adminer/*
// @copyright  2013+, fnkr
// @require     https://cdn.fnkr.net/jquery/jquery-2.0.3.js
// @downloadURL https://userscripts.org/scripts/source/183887.user.js
// @updateURL   https://userscripts.org/scripts/source/183887.meta.js
// ==/UserScript==
(function() {
    window.userFormatSizesStart = function() {
        setTimeout(function() {
            userFormatSizesNow();
        }, 10);
    };

    window.userFormatSizesBytesToSize = function(bytes) {
        var sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0) return '0 B';
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return (bytes / Math.pow(1024, i)).toPrecision(3) + ' ' + sizes[i];
    }

    window.userFormatSizesNow = function() {
        $('[id*="_length"]').each(function(count, item) {
            if (!$(item).hasClass('userFormatSizesDone') & (($(item).html() != '?') & ($(item).html() != '&nbsp;'))) {
                $(item).attr('title', $(item).text() + ' B');
                $(item).html(userFormatSizesBytesToSize($(item).text().replace(/[^0-9.]/g, '')));
                $(item).addClass('userFormatSizesDone');
            }
        });
        if ($('.userFormatSizesDone').length != $('[id*="_length"]').length) {
            userFormatSizesStart();
        }
    }

    userFormatSizesStart();
})();