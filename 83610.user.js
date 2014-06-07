// ==UserScript==
// @name           Reddit /r/wikipedia improver
// @namespace      http://GreasyMonkey.com
// @include        http://www.reddit.com/r/wikipedia*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==

jQuery('.title')
    .each(function() {
        var title_bar = jQuery(this);
        var headline = title_bar.find('a.title');
        var domain = title_bar.find('span.domain');
        var domain_link = domain.find('a');
        if (domain_link.html() !== 'en.wikipedia.org')
            return;
        var url = headline.attr('href');
        var matches = url.match(/.*\/wiki\/(.+)/);
        var article_title = decodeURIComponent(matches[1]);
        article_title = article_title.replace(/_/g, ' ');
        var headline_lc = headline.html().toLowerCase();
        var article_lc = article_title.toLowerCase();
        if (headline_lc == article_lc)
            domain.html('[=]');
        else
            domain.html('[' + article_title + ']');
    });
