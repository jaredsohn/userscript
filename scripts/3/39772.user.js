// ==UserScript==
// @name        Invert Inverted Pyramid
// @namespace   http://tr.ashcan.org/
// @description Inverts the inverted pyramid style of reporting for many major news sites
// @include     http://nytimes.com/*
// @include     http://www.nytimes.com/*
// @include     http://news.yahoo.com/*
// @include     http://news.bbc.co.uk/*
// @include     http://*.cnn.com/*
// @include     http://www.google.com/hostednews/*
// @include     http://www.guardian.co.uk/*
// @include     http://*.reuters.com/*
// ==/UserScript==

(function() {
    var article;
    var host = window.location.hostname;
    switch (host) {
        case 'nytimes.com':
        case 'www.nytimes.com':
            article = document.getElementsByTagName('nyt_text')[0];
            break;
        case 'news.yahoo.com':
            article = document.getElementsByClassName('yn-story-content')[0];
            break;
        case 'news.bbc.co.uk':
            article = document.getElementsByClassName('storybody')[0];
            break;
        case 'www.google.com':
            article = document.getElementById('hn-articlebody');
            break;
        case 'www.guardian.co.uk':
            article = document.getElementById('article-wrapper');
            break;
    }
    // Check for weirder stuff
    if (host.indexOf('cnn.com') != -1) {
        article = document.getElementsByClassName('cnnContentContainer')[0];
    }
    else if (host.indexOf('reuters.com') != -1) {
        article = document.getElementById('resizeableText');
    }

    if (typeof(article) == 'undefined') {
        return;
    }

    var paragraphs = article.childNodes;
    for (var i = paragraphs.length - 1; i >= 0; i--) {
        article.appendChild(paragraphs[i]);
    }
})()
