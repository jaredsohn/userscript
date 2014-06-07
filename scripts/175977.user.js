// ==UserScript==
// @name       Privat24 pasting verification code
// @namespace  http://privat24.ua/
// @version    0.1
// @description  You can paste code to privat24 in the first field
// @match      https://privat24.ua/*
// @copyright  2013+, And
// ==/UserScript==

(function($) {
    $('input.input-section[data-name=first-section]').live('paste', function(evt) { 
        var timeout = 100;
        var clipboardData = $.trim(evt.originalEvent.clipboardData.getData('text/plain'));
        if (! clipboardData.match(/^\d{2}-\d{2}-\d{2}-\d{2}$/)) return;
        var splittedData = clipboardData.split('-');
        $(evt.target).parent().find('input.input-section').each(function(i) {
            var self = this;
            setTimeout(function() { $(self).val(splittedData[i]); }, timeout);
        });
        setTimeout(function() { $(evt.target).next().next().next().click(); }, timeout);
        return false;
    });
})(jQuery);

