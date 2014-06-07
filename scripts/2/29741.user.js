// ==UserScript==
// @name           Trac: Timeline Filter
// @namespace      http://8-p.info/
// @description    Adds incremental filter to Trac Timeline.
// @include        http://*/timeline
// ==/UserScript==
//
// $Id: trac_timeline_filter.user.js,v 7a690b591e93 2008/07/07 15:03:54 kzys $

function nextElement(element, name)
{
    while (element.nextSibling) {
        element = element.nextSibling;
        if (element.nodeName == name) {
            return element;
        }
    }
}

function filterTimeline(query)
{
    var dts = document.getElementsByTagName('dt');
    var i = 0;
    for (i = 0; i < dts.length; i++) {
        var dt = dts[i];
        var dd = nextElement(dt, 'DD');

        if (query != '' &&
            dt.textContent.indexOf(query) == -1 &&
            dd.textContent.indexOf(query) == -1) {
            dt.style.display = 'none';
            dd.style.display = 'none';
        } else {
            dt.style.display = '';
            dd.style.display = '';
        }
    }
}

function createQueryDiv()
{
    var result = document.createElement('div');
    var input = document.createElement('input');

    input.type = 'text';
    input.addEventListener('keyup',
                           function () { filterTimeline(input.value); },
                           false);
    result.appendChild(input);

    return result;
}

new function () {
    var prefs = document.getElementById('prefs');
    prefs.parentNode.insertBefore(createQueryDiv(), prefs);
}
