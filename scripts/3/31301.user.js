// ==UserScript==
// @name           Delicious[yahoo] decrapifier lite
// @description    Delicious[yahoo] decrapifier lite v. 0.0.1
// @namespace      what
// @include        http://delicious.com/*
// @include        http://del.icio.us/*
// @encoding       utf-8
// ==/UserScript==

// A joint effort of drdaeman and EndlessWorld

(function () {
    var months = {'JAN': '01', 'FEB': '02', 'MAR': '03',
                  'APR': '04', 'MAY': '05', 'JUN': '06',
                  'JUL': '07', 'AUG': '08', 'SEP': '09',
                  'OCT': '10', 'NOV': '11', 'DEC': '12'};
    var date_span_selector = "//div[@class='dateGroup']/span";
    var re_uglydate = /^\s*(\d+)\s+([A-Z]{3})\s+(\d{2})\s*$/;

    // By the DiveIntoGreaseMonkey book author
    function addGlobalStyle(css) {
        var head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }

    function fixDate(date) {
        var m = re_uglydate.exec(date);
        if (m) {
            return '20' + m[3] + '-' + months[m[2]] + '-' + m[1];
        } else {
            return date;
        }
    }

    addGlobalStyle(''
                   + 'ul.bookmarks li.post h4 { margin-top: 4px; }'
                   + 'ul.bookmarks li.post h4 a:visited { color: #66F; }'
                   + 'ul.bookmarks li.post h4 a { color: #00F; }'
                   + '.tagdisplay { margin-left: -6px; }'
                   + 'ul.tag-chain { float: left; }'
                   + 'ul.bookmarks li.post .meta { float: right; }'
                   + 'ul.bookmarks li.post { margin: 0.6em 0 0 5em; }'
                   + 'ul.bookmarks .dateGroup { padding-top: 10px; }'
                   + '#bookmark-display-options { margin: 8px 0 2px 0; }'
                   + '#pagetitle #see_also { display: none; }'
                   + 'ul.bookmarks li.post .description { color: #000; }'
                   + 'a.taggedlink { color: #00F !important; }'
		   // Bright square things are annoying
                   + '.savers { border-top: 1px #ddd solid; }'
                   + '.delNav { background-color: #fff !important; color: #ccf !important; }'
                   + '.delNav:hover { background-color: #99f !important; color: #fff !important; }'
		   // Blinking words even more so
                   + '.savers-label { visibility: hidden !important; }'
                   + '.tag-chain-label { visibility: hidden !important; }'
		   // Make the ug-leh green button look as a blue one
		   + '.btn-green-gray, .btn-green-r-gray { background-color: #3274D0 !important;'
		   + 'background-position: left -2000px !important;}'
		   + '.btn-green-gray button, .btn-green-gray a, .btn-green-r-gray a, '
		   + '.btn-green-r-gray button { background-position: right -2050px !important;'
		   + 'padding-right: 15px !important;}'
		   // Who needs the header and the footer
                   + '#navigation { visibility: hidden; }'
                   + '#footernavigation { visibility: hidden; }');
    var s = document.evaluate(date_span_selector, document,
        null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < s.snapshotLength; i++) {
        var span = s.snapshotItem(i);
        span.innerHTML = fixDate(span.innerHTML);
    }
})();



