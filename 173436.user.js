// ==UserScript==
// @name        ThePirateBay - Search Exclusion
// @namespace   http://userscripts.org/users/23652
// @description Use the google system of adding a hyphen before a word to exclude it in a search
// @include     http://thepiratebay.sx/search/*
// @include     https://thepiratebay.sx/search/*
// @include     http://thepiratebay.se/search/*
// @include     https://thepiratebay.se/search/*
// @copyright   JoeSimmons
// @version     1.0.1
// @license     GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @downloadURL http://userscripts.org/scripts/source/173436.user.js
// @updateURL   http://userscripts.org/scripts/source/173436.meta.js
// @require     https://raw.github.com/joesimmons/jsl/master/versions/jsl-1.3.1.js
// ==/UserScript==

window.addEventListener('load', function tpb_search_exclusion() {
    'use strict';

    var search_box = JSL('//form[@id="q"]//input[@name="q"]'),
        submit = JSL('//form[@id="q"]//input[@type="submit"]');

    function prepareRegex(str) {
        return str.replace(/([\[\]\^\&\$\.\(\)\?\/\\\+\{\}\|])/g, "\\$1");
    }

    function doExclusion() {
        var results = JSL('#searchResult > tbody > tr'),
            exclude_box = JSL('#exclude_box'),
            exclude_value = (exclude_box.exists ? exclude_box.value().trim() : ''),
            excludes = [],
            result, det, i, tmp;

        if (!results.exists || !exclude_box.exists) { return; }

        tmp = exclude_value.split( /\s*,\s*/ );
        tmp.forEach(function (val, i) {
            val = prepareRegex( val.trim() ).replace(/\*/g, '[\\s\\S]*');
            if (val !== '') {
                excludes.push(val);
            }
        });

        if (excludes.length > 0) {
            excludes = new RegExp(excludes.join('|'), 'i');

            results.each(function (result) {
                det = JSL('a[title^="Details for"]', result);
                if ( det.text().match(excludes) ) {
                    result.style.display = 'none';
                } else {
                    result.style.display = '';
                }
            });
        } else {
            results.show();
        }
    }

    // Make sure the page is not in a frame
    if (window.self !== window.top || !search_box || !submit) { return; }

    submit.after('div', {style : 'display: block; padding: 2px;'}, [
        JSL.create('input', {type : 'text', id : 'exclude_box', class : 'inputbox', style : 'color: #6A0000; font-family: sans-serif, verdana, arial; font-size: 10pt; font-weight: bold;'}),
        JSL.create('input', {type : 'button', id : 'exclude_button', value : 'Exclude', class : 'submitbutton'}),
        JSL.create('span', {style : 'margin-left: 8px; font-style: italic; font-size: 10pt; font-family: sans-serif, verdana, arial;'}, [
            JSL.create('text', '<- (insert excludes here, separated by commas) (asterisk wildcards work)')
        ])
    ]
    );

    // do exclusion if Enter was pressed
    JSL('#exclude_box').addEvent('keyup', function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            event.stopPropagation();
            doExclusion();
        }
    });

    // do exclusion if button was clicked
    JSL('#exclude_button').addEvent('click', doExclusion);
}, false);