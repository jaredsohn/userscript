// ==UserScript==
// @name           booru2tumblr
// @namespace      TAT
// @description    Easy upload booru images to tumblr
// @author         TAT
// @include        http://danbooru.donmai.us/posts/*
// @include        http://furry.booru.org/index.php?page=post*
// @version        1.0
// ==/UserScript==

/*
Copyright (c) 2012, Thomas "TAT" Andresen
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met: 

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer. 
2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution. 

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

var s = document.createElement('script');
s.src = "//ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js";
document.head.insertBefore(s,document.head.firstChild);

function booru2tumblr() {
    this.boorus = {
        'danbooru': {
            url: 'http://danbooru.donmai.us',
            fullsize: 'li:contains("Size:") a',
            source: 'li:contains("Source:") a',
            tags: '#tag-list li',
            target: 'section:contains("Options")'
        },
        'furrybooru': {
            url: 'http://furry.booru.org',
            fullsize: 'a:contains("Original image")',
            source: 'li:contains("Source:") a',
            tags: '#tag-sidebar li',
            target: 'div.sidebar div:contains("Options")'
        }
    };
    this.main = function() {
        var booru;
        for (var i in this.boorus) {
            if (document.location.origin === this.boorus[i].url) {
                booru = this.boorus[i];
                break;
            }
        }
        if (booru === undefined) return;
        console.log("booru2tumblr v.1.0 enabled!");
        $(document).ready(function() {
            var a,
                b = [],
                d = $(booru.tags).find('a:not(:contains("?"))'),
                e = $(booru.source).length > 0 ? $(booru.source).attr('href') : booru.url + document.location.pathname,
                f = $(booru.fullsize).attr('href');
                if (f.indexOf('://') < 0) f = booru.url + f;
            d.each(function() { b.push($(this).text()); });
            a = '<li><a href="#" onclick="window.open(\'http://www.tumblr.com/share/photo' + 
                    '?source=' + escape(f) +
                    '&clickthru=' + escape(e) +
                    (b.length > 0 ? '&tags=' + escape(b.join(', ')) : '') +
                    '\',\'booru2tumblr\',\'width=450,height=450\')">booru2tumblr</a></li>';
            $(booru.target).find('ul').append(a);
        });
    };
}

var script = document.createElement("script");
script.textContent = booru2tumblr.toString() + "\nvar _booru2tumblr = new booru2tumblr();\nsetTimeout(function() { _booru2tumblr.main(); },1000);";
document.head.appendChild(script);