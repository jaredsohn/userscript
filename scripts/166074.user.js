// ==UserScript==
// @name           yande.re2tumblr
// @namespace      TAT
// @description    Easy upload yande.re images to tumblr
// @author         TAT
// @include        https://yande.re/post/show/*
// @version        1.1
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

function yandere2tumblr() {
    this.main = function() {
        console.log("yande.re2tumblr v.1.1 enabled!");
        $(document).ready(function() {
            var a,
                b = [],
                d = $("#tag-sidebar").find('a:not(:contains("?"))'),
                e = $('li:contains("Source:")') ? $('li:contains("Source:")').find('a').attr('href') : 'http://yande.re' + document.location.pathname,
                f = $('a:contains("Download PNG")').length > 0 ? $('a:contains("Download PNG")').attr('href') : $('a:contains("Download larger version")').length > 0 ? $('a:contains("Download larger version")').attr('href') : $('a:contains("Image (")').attr('href');
            if (f === undefined) return;
            d.each(function() { if ($(this).attr('class') !== 'no-browser-link') b.push($(this).text()); });
            a = '<li><a href="#" onclick="window.open(\'http://www.tumblr.com/share/photo' + 
                    '?source=' + escape(f) +
                    '&clickthru=' + escape(e) +
                    (b.length > 0 ? '&tags=' + escape(b.join(', ')) : '') +
                    '\',\'yande.re2tumblr\',\'width=450,height=450\')">yande.re2tumblr</a></li>';
            $('.sidebar').find('div:contains("Options")').find('ul').append(a);
        });
    };
}

var script = document.createElement("script");
script.textContent = yandere2tumblr.toString() + "\nvar _yandere2tumblr = new yandere2tumblr();\nsetTimeout(function() { _yandere2tumblr.main(); },1000);";
document.head.appendChild(script);