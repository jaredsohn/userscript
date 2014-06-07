// ==UserScript==
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://addons.mozilla.org/de/firefox/addon/748
// Then restart Firefox and revisit this script.
// Accept the default configuration and install.
//
// --------------------------------------------------------------------
//
// @name           Google Results Highligher and Numberer for Ajax and Classic SERP's.
// @namespace      http://martin.bz.it/
// @description    This Greasemonkey script highlights your favorite websites and numbers the results.
// @include        *google.*q=*
// @version        1.0.09101702
// @copyright      2009, Martin Meixger (http://martin.bz.it/)
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
//
// ==/UserScript==

// Credits:
// Joan Piedra "How to play nicely with jQuery and Greasemonkey" - http://joanpiedra.com/jquery/greasemonkey/
// Stephen Cronin "Numbered Search Results" - http://userscripts.org/scripts/review/57306
// Amir Harel "Manipulating Google Results – Ajax Version" - http://www.amirharel.com/2009/07/19/manipulating-google-results-ajax-version/

var HighlightSettings = {};
// DEFINE YOUR WEBSITES
HighlightSettings.Highlights = {
    'martin.bz.it'        : 'meixger',
    'suedtirolinfo.net'   : 'lightgreen',
    '.suedtirol.com'      : 'lightgreen', 
    'wikipedia.org'       : 'blackborder',
    'suedtirol.info'      : 'blackborder',
    'suedtirol-reisen.com': 'redborder',
    'meinsuedtirol.com'   : 'pink',
    'suedtirol.ch'        : 'green',
    'suedtirolerland.it'  : 'yellow',
    'suedtirol-hotels.com': 'orange'
}

HighlightSettings.Styles = {
    // DEFINE YOUR (CSS) STYLES
    meixger: 'background-color: red;',
    lightgreen: 'background-color: #9f9;',
    blackborder: 'border-left: solid 5px black;',
    redborder: 'border-left: solid red 10px;',
    pink: 'border-left: solid LightPink 10px;',
    green: 'background-color: YellowGreen;',
    yellow: 'background-color: yellow;',
    orange: 'background-color: orange;'
}

// Donate https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=8983523

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
    if (typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait, 100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

// All your GM code must be inside this function
function letsJQuery() {
    $(document).ready(function() {
        InjectStyles(HighlightSettings.Styles);
        Highlight();
        doit('ready');

        //DOMAttrModified gets fired, when google changes the footer after paging
         document.addEventListener('DOMAttrModified', function(event) {
            if (event.target.id == 'foot') {
                InjectStyles(HighlightSettings.Styles);
                Highlight();
                doit('DOMAttrModified');
            }
        }, false);
    });

    function InjectStyles(styles) {
        var buf = '';
        $.each(styles, function(name, rule) {
            buf += '.' + name + " { " + rule + " } ";
        });
        buf = '<style type="text/css">' + buf + '</style>';
        $('head').append(buf);
    }

    function Highlight() {
        HighlightSerps();
        HighlightImages();
    }

    function HighlightSerps() {
        var results = $('a.l');
        results.each(function() {
            var a = $(this)
            $.each(HighlightSettings.Highlights, function(domain, cssclass) {
                if (a.attr('href').replace(/https?:\/\//, '').replace(/\/.*/, '').indexOf(domain) >= 0) { // stripping http/https prefix and url path after root /
                    var parent = $('a[href="' + a.attr('href') + '"]').parent('h3').parent('li');
                    if (parent.length > 0) {
                        parent.addClass(cssclass);
                    } else {
                        // try ancestor div - for Blog Results
                        console.log('trying blog');
                        parent = $('a[href="' + a.attr('href') + '"]').closest('div');
                        console.log('blog length' + parent.length);
                        if (parent.length>0) {
                            parent.addClass(cssclass).addClass(cssclass).css('padding', '10px');
                        }
                    }
                }
            });
        });
    }
    function HighlightImages() {
        var results = $('div#iur a');
        results.each(function() {
            var a = $(this);
            $.each(HighlightSettings.Highlights, function(domain, cssclass) {
                if (a.attr('href').indexOf(domain) >= 0) {
                    $('a[href="' + a.attr('href') + '"] > img').addClass(cssclass).css('padding', '10px').css('border', 'none');
                }
            });
        });
    }

    function doit(sender) {
        // Check if it's a search page and grab the URL parameters
        if (window.location.toString().indexOf('/search?') > 1) {
            var query = window.location.search.substring(1);
            var isSearch = true;
        }
        else if (window.location.toString().indexOf('/#') > 1) {
            var query = window.location.hash;
            var isSearch = true;
        }
        else {
            var isSearch = false;
        }

        if (isSearch) {
            // see if start is in the URL
            var start = 0;
            var pairs = query.split('&');
            for (i = 0; i < pairs.length; i++) {
                var pos = pairs[i].indexOf('=');
                if (pos >= 0 && pairs[i].substring(0, pos) == 'start') {
                    start = pairs[i].substring(pos + 1);
                }
            }
            // go through each list item and add the numbers to the front
            if ($('li.g').length > 0) {
                var count = 1;
                $('li.g').each(function() {
                    $(this).prepend(((start * 1) + count) + '. ');
                    count++;
                });
            }
            // if no list items and not an empty result set, then we're dealing with the AJAX version, so redirect to old style search page
            // note: empty result set will redirect once (because 'did not match any documents' will not be found in AJAX result), but then stop
            else if ($('div#res').text().indexOf('did not match any documents') == -1) {
                //	top.location = document.location.toString().replace('#','search?').replace('fp=','sjc=');
            }
        }
    }
}