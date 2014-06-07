// ==UserScript==
// @name       LibAnswers View
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://*/*
// @copyright  2012+, You
// ==/UserScript==

restyle = function() {
    $("#maintable tr[id^='unans'] td").css({
        'vertical-align': 'top',
    });
    $("#maintable tr[id^='unans'] td:nth-child(4) > div").css({
                'max-height': '250px',
                                'overflow-y': 'scroll'
    });
    $("#maintable tr[id^='unans'] td:nth-child(4)").each(function(index, ele) {
        if ($(ele).html().indexOf("Edmonton Zone") > -1) {
            $(ele).parent().children('td').css('background', '#F7FFC2');
        }
    });
}

poll_start = function() {
    if ($("#maintable tr[id^='unans'] td").size() < 1) {
        console.log('trying again');
        setTimeout(poll_start, 100);
    }
    restyle();
}

window.addEventListener('load', function() { poll_start() }, false);
