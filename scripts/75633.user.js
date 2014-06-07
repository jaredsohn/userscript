// ==UserScript==
// @name           Paul Graham Topics
// @namespace      http://metaphysicaldeveloper.wordpress.com/
// @include        http://www.paulgraham.com/*
// @include        http://paulgraham.com*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js
// ==/UserScript==


var GM_JQ = document.createElement('script');
GM_JQ.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);
function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }

    else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

function letsJQuery() {
    function getElements() {
        var elements = $('b');
        var filteredElements = elements.filter(function() {
                return $(this).text().match(/^\d+/);
            });
        if (filteredElements.size() == 0) {
            return elements;
        }
        return filteredElements;
    }

    var count = 1;
    var elements = getElements();
    if (elements.size() == 0) {
        return;
    }
    $('body').append('<div id="gm_topics"><h3><i>Topics</i></h3><div id="gm_data"></div></div>');

    $('#gm_topics')
        .css('position', 'fixed')
        .css('top', '20px')
        .css('right', '20px')
        .css('padding', '2px 4px 2px 4px')
        .css('max-width', '30%')
        .css('max-height', '70%')
        .css('overflow', 'auto')
        .css('border', 'solid 1px #000000');
    var data = $("#gm_data");
    data.append('<ul>');
    elements.each(function() {
            var name = $(this).text();
            var link_name = 'gm_topic_' + count;
            $(this).replaceWith('<a name="' + link_name + '"><b> '+ name + '</b></a>');
            data.append('<li><a href=#' + link_name + '>' +  name + '<br></a></li>');
            count++;
        });
    data.append('</ul>');
}
