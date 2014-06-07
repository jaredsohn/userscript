// ==UserScript==
// @name           Trac: Filter out c2devel
// @namespace      http://inovageo.com/
// @description    Filters out c2devel entries from the timeline
// @include        http://*/timeline
// ==/UserScript==

function nextElement(element, name)
{
    while (element.nextSibling) {
        element = element.nextSibling;
        if (element.nodeName == name) {
            return element;
        }
    }
}

function filterOutTimeline(query)
{
    var dts = document.getElementsByTagName('dt');
    var i = 0;
    for (i = 0; i < dts.length; i++) {
        var dt = dts[i];
        var dd = nextElement(dt, 'DD');

        if (query != '' &&
            dt.textContent.indexOf(query) == -1) {
            dt.style.display = '';
            dd.style.display = '';
        } else {
            dt.style.display = 'none';
            dd.style.display = 'none';
        }
    }
}

new function () {
	filterOutTimeline('c2devel');
}
