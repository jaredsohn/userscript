/* vim: set et ts=4 sw=4 sts=4 smartindent: */
/*
 * Copyright (c) 2011 Benjamin Althues <benjamin@babab.nl>
 *
 * Permission to use, copy, modify, and distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */
// ==UserScript==
// @name           YouTube comments disabler
// @namespace      babab.nl
// @description    Disable comments from YouTube per default, with an option to (temporarily) display them for a single video.
// @version	       1.0
// @license	       ISC License; http://www.opensource.org/licenses/ISC 
// @copyright      2011, Benjamin Althues (http://babab.nl)
// @include        http://www.youtube.*/*
// @include        http://youtube.*/*
// @include        https://www.youtube.*/*
// @include        https://youtube.*/*
// ==/UserScript==

(function() {
    var message = 'Comments are disabled.';
    var link= '<a id="gmnc_link" href="#watch-discussion"' + 
        '>Click to view them for this video</a>';
    var elem = document.getElementById("watch-discussion");
    if (elem) {
        function showComments() {
            message = "Comments are temporarily enabled for this video";
            elem.innerHTML = '<strong>' + message + '</strong><br>' + content;
        }
        var content = elem.innerHTML;
        elem.innerHTML = '<strong>' + message + ' ' + link + '</strong>';
        var gmnc_link= document.getElementById("gmnc_link");
        gmnc_link.addEventListener("click", showComments, true);
    }
})();
