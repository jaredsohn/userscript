// ==UserScript==
// @name       Webalizer Human Readable Sizes
// @namespace  https://ge1.me/userscript-webalizerhumanreadablesizes
// @version    0.1
// @description Format KB sizes in MB, GB or TB if needed (on the Summary by Month-page only, for now).
// @include    http://example.com/webalizer/*
// @copyright  2013+, fnkr
// @require     https://cdn.fnkr.net/jquery/jquery-2.0.3.js
// @downloadURL https://userscripts.org/scripts/source/183888.user.js
// @updateURL   https://userscripts.org/scripts/source/183888.meta.js
// ==/UserScript==
(function() {
    var kbToSize = function(kb) {
        bytes = kb * 1024;
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0) return '0 Bytes';
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return (bytes / Math.pow(1024, i)).toPrecision(3) + ' ' + sizes[i];
    }

    var tmp = document.location.pathname.split('#')[0].split('/');
    if (tmp[tmp.length - 1] == '' || tmp[tmp.length - 1] == 'index.html') {
        $($('table')[0]).find('tr').each(function(count, item) {
            var dataItem = $(item).find('td')[6];
            dataItem = $(dataItem).find('*');
            if (dataItem) {
                $(dataItem).html(kbToSize($(dataItem).text()));
            }
        });

        var dataItem = $.find('th[align="right"]>*')[0];
        if (dataItem) {
            $(dataItem).html(kbToSize($(dataItem).text()));
        }
    }
})();