// ==UserScript==
// @name           Wikipedia Random Articles Within Category
// @description    A way to easilly access a random article within a specific category on Wikipedia ( an [R] is placed next to category links ), best used with Portal:Contents/Categories - http://en.wikipedia.org/wiki/Portal:Contents/Categorical_index
// @include        http://en.wikipedia.org/*
// @include        https://en.wikipedia.org/*
// @require       http://code.jquery.com/jquery-1.7.2.min.js
// @version        0.3
// @author	   Brynjar Harðarson
// @date	   Jun 24, 2012
// @modified	   Jun 26, 2012
// @run-at	   document-end
// ==/UserScript==
//
// TODO
// * Support Wikipedia in more languages then english.
// * Be able to select "depth".
// * Be able to save and edit "depth".
//
//

/*!
 * Wikipedia Random Information Injection, Within Category
 * http://userscripts.org/scripts/show/136939
 *
 * Copyright 2012, Brynjar Harðarson
 * Licensed under GPL Version 2 licenses.
 * http://www.opensource.org/licenses/GPL-2.0
 */

(function () {
    /*!
     * jQuery Cookie Plugin
     * https://github.com/carhartl/jquery-cookie
     *
     * Copyright 2011, Klaus Hartl
     * Dual licensed under the MIT or GPL Version 2 licenses.
     * http://www.opensource.org/licenses/mit-license.php
     * http://www.opensource.org/licenses/GPL-2.0
     */
    $.cookie = function(key, value, options) {
        // key and at least value given, set cookie...
        if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) {
            options = $.extend({}, options);
    
            if (value === null || value === undefined) {
                options.expires = -1;
            }
    
            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }
    
            value = String(value);
    
            return (document.cookie = [
                encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path    ? '; path=' + options.path : '',
                options.domain  ? '; domain=' + options.domain : '',
                options.secure  ? '; secure' : ''
            ].join(''));
        }
    
        // key and possibly options given, get cookie...
        options = value || {};
        var decode = options.raw ? function(s) { return s; } : decodeURIComponent;
    
        var pairs = document.cookie.split('; ');
        for (var i = 0, pair; pair = pairs[i] && pairs[i].split('='); i++) {
            if (decode(pair[0]) === key) return decode(pair[1] || ''); // IE saves cookies with empty string as "c; ", e.g. without "=" as opposed to EOMB, thus pair[1] may be undefined
        }
        return null;
    };
    
    
    //Start
    var deep = 5;
    var link_start = "http://tools.wikimedia.de/~erwin85/randomarticle.php?lang=en&family=wikipedia&categories="
    var link_end = "|&namespaces=&subcats=1&d="+deep;
    var c = $.cookie('rwc_category');
    if (c !== null) {
        $($("#n-randompage").children()[0]).after(" <a href='"+link_start+c+link_end+"'>[C]</a>");
    }
    $($("#n-randompage").children()[0]).after(" <a href='http://en.wikipedia.org/wiki/Portal:Contents/Categorical_index'>[I]</a>");
    
    
    $('a[href*="Category"]').each(function() {
        var s = $(this).attr("href").split(":");
        if (s[0] == "/wiki/Category") {
            $(this).after(" <a id='"+s[1]+"' class='random_category' href='"+link_start+s[1]+link_end+"'>[R]</a>");
        }
    });
    
    
    $(".random_category").click(function() {
        $.cookie('rwc_category', $(this).attr("id"), { path: '/' });
    });
})();
