// ==UserScript==
// @name           Ignorovat u vypisu temat na fitusce
// @description    Zobrazi link ignorovat tema ve vysledcich vyhledavani a vypisu temat
// @include        https://fituska.eu/search.php*
// ==/UserScript==

function isdefined( variable)
{
    return (typeof(window[variable]) == "undefined")?  false: true;
}

if(!isdefined("unsafeWindow")) window["unsafeWindow"] = window;

// Add jQuery
(function(){
    if (typeof unsafeWindow.jQuery == 'undefined') {
        var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
            GM_JQ = document.createElement('script');

        GM_JQ.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js';
        GM_JQ.type = 'text/javascript';
        GM_JQ.async = true;

        GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
    }
    GM_wait();
})();

// Check if jQuery's loaded
function GM_wait() {
    if (typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(GM_wait, 100);
    } else {
        var $ = unsafeWindow.jQuery.noConflict(true);
        letsJQuery($);
    }
}

// All your GM code must be inside this function
function letsJQuery($) {
    $('table.tablebg .row1 a.topictitle[href^="./viewtopic.php"]').each(function() {
        var me = $(this);
        var topic = me.attr('href').replace(/^.*&t=([0-9]+).*$/g, "$1");
        var onclick = 'onclick="return !Ignore.toggleIgnore(\'Ignorovat\', \'Neignorovat\', \'x_ignore_topic_' + topic + '\', \'./ignore.php?topic_id=' + topic + '&ignore=1\', \'./ignore.php?topic_id=' + topic + '&ignore=0\');"';
        me.parent().prepend('<a id="x_ignore_topic_' + topic + '" style="float:right" href="' + me.attr('href') + '&ignore=1" ' + onclick + '>Ignorovat</a>');
    });
}
