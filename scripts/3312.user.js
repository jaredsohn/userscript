// Alexadex.com - Chart Options 1.1
// Copyright (c) 2006 Todd James
//
// This work is licensed under a Creative Commons License
// See http://creativecommons.org/licenses/by-nc-sa/2.5/
//
// ==UserScript==
// @name           Alexadex.com - Chart Options
// @namespace      http://userscripts.org/people/3628
// @description    Adds links to change the period of time displayed by charts on Alexadex.
// @include        http://www.alexadex.com/*
// @include        http://alexadex.com/*
// ==/UserScript==

(function() {
    function addLink(periodLength, periodText) {
        var tempImage = document.createElement('img');
        tempImage.setAttribute('src', chartImage.getAttribute('src').replace('http://traffic.alexa.com/graph?w=379&h=216&r=3m', 'http://traffic.alexa.com/graph?w=379&h=216&r=' + periodLength));
        tempImage.setAttribute('style', 'display: none;');

        var tempLink = document.createElement('a');
        tempLink.setAttribute('href', location.href);
        tempLink.setAttribute('onclick', 'javascript:return false;');
        tempLink.setAttribute('onmouseover', 'javascript:document.getElementById(\'chartImage\').src=\'' + tempImage.getAttribute('src') + '\';');
        tempLink.appendChild(document.createTextNode(periodText));
        tempLink.appendChild(tempImage);

        if (called) {
            chartImage.parentNode.parentNode.insertBefore(document.createTextNode(' | '), chartImage.parentNode.nextSibling);
        }
        else {
            called = 1;
        }

        chartImage.parentNode.parentNode.insertBefore(tempLink, chartImage.parentNode.nextSibling);
    }

    var imageElements = document.getElementsByTagName('img');
    var linkElements = document.getElementsByTagName('a');
    var i, called = 0, found = 0;

    for (i = 0; i < linkElements.length; i++) {
        if ((linkElements[i].getAttribute('title') == 'us english') && (linkElements[i].innerHTML == 'welcome')) {
            return;
        }
    }

    for (i = 0; i < imageElements.length; i++) {
        if (imageElements[i].getAttribute('src').match(/^http:\/\/traffic.alexa.com\/graph\?.+$/)) {
            found = 1;
            break;
        }
    }

    if (!found) {
        return;
    }

    var chartImage = imageElements[i];
    chartImage.setAttribute('id', 'chartImage');

    addLink('6m', '6 months');
    addLink('3m', '3 months');
    addLink('1m', '1 month');
    addLink('14d', '14 days');
    addLink('7d', '7 days');

    chartImage.parentNode.parentNode.insertBefore(document.createElement('br'), chartImage.parentNode.nextSibling);
    chartImage.parentNode.parentNode.insertBefore(document.createElement('br'), chartImage.parentNode.nextSibling);
})();
