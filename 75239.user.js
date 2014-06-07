// ==UserScript==
// @name           GoogleNews
// @namespace      http://happyfunball.tv/googleNewsFilter
// @include        http://news.google.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==



// http://blog.mastykarz.nl/jquery-regex-filter/
jQuery.extend(
    jQuery.expr[':'], {
        regex: function(a, i, m, r) {
            var r = new RegExp(m[3], 'i');
            return r.test(jQuery(a).text());
        }
    }
);


jQuery(function() {
    //jQuery("h2.title, h3.title, div.title").find(":regex('Obama|Oprah|Sheen|Justin|Palin')").closest("div.story").remove();
    jQuery("span.titletext:regex('Obama|Oprah|Sheen|Justin|Palin')").closest("div.esc-wrapper").remove();
});