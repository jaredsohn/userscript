/**
 * Copyright (c) 2012 Michael Carter <kiliman@systemex.net>
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

// ==UserScript==
// @name                JapanesePod101.com hide romaji
// @namespace	        http://www.systemex.net/greasemonkey/hide-romaji
// @description	        Hide Romaji on JapanasePod101.com Transcripts
// @include	            http://www.japanesepod101.com/*
// ==/UserScript==

var lc_div = document.getElementById('lc_div');
if (lc_div) {
    lc_div.addEventListener('DOMNodeInserted', function (event) {
        hideRomaji(event.target);
    }, false);
}

function hideRomaji(target) {
    try {
        if (target.tagName !== 'DIV') return;

        var hash = document.location.hash;
        if (hash === '#lc_transcript') {
            var strongs = target.querySelectorAll('div.lc_box strong');
            for (var i = 0; i < strongs.length; i++) {
                var e = strongs[i];
                if (e.innerHTML === 'Romaji') {
                    e.parentNode.parentNode.parentNode.style.display = 'none';
                }
            }
        }
        else if (hash === '#lc_vocabulary_list') {
            var table = target.querySelector('table.Dictionary');
            if (table) {
                for (var i = 0; i < table.rows.length; i++) {
                    var row = table.rows[i];
                    row.cells[3].style.display = 'none';
                }
            }
        }
        else if (hash === '#lc_vocabulary_expansion') {
            var divs = target.querySelectorAll('div[id="sample_"]');
            for (var i = 0; i < divs.length; i++) {
                var div = divs[i];
                var table = div.querySelector('table');
                if (table) {
                    table.rows[1].style.display = 'none';   // hide romaji row
                }
            }
        }
        else if (hash === '#lc_grammar_list') {
            var tables = target.querySelectorAll('table');
            for (var i = 0; i < tables.length; i++) {
                var table = tables[i];
                for (var j = 0; j < table.rows.length; j++) {
                    var row = table.rows[j];
                    row.cells[0].style.display = 'none';
                }
            }
        }
    } catch (e) {
        alert(e);
    }
}
