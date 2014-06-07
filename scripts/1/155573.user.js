// ==UserScript==
// @name           rule342tumblr
// @namespace      TAT
// @description    Easy upload rule34 images to tumblr
// @author         TAT
// @include        http://rule34.xxx/*
// @include        http://rule34.paheal.net/post/view/*
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

function rule342tumblr() {
    this.main = function() {
        console.log("rule342tumblr v.1.0 enabled!");
        $(document).ready(function() {
            var a,
                b = [],
                c = document.location.href.indexOf('http://rule34.xxx') === 0,
                d = c ? $("#tag-sidebar").find("li").find("a") : $(".tag_name"),
                e = c ? 'http://rule34.xxx/index.php?page=post&s=view&id=' + document.head.innerHTML.split("<title>")[1].split("</title>")[0].split("|")[1].trim() : 'http://rule34.paheal.net/post/view/' + $("meta[property='og:url']").attr('content'),
                f = c ? $('a:contains("Original image")').attr('href') : $("#main_image").attr('src');
            d.each(function() { b.push($(this).text()); });
            a = '<b><a href="#" onclick="window.open(\'http://www.tumblr.com/share/photo' + 
                    '?source=' + escape(f) +
                    '&clickthru=' + escape(e) +
                    (b.length > 0 ? '&tags=' + escape(b.join(', ')) : '') +
                    '\',\'rule342tumblr\',\'width=450,height=450\')">rule342tumblr</a></b>';
            if (c) $('ul:contains("Original image")').append("<li>" + a + "</li>")
            else   $("#Image_Controlsleft").find("div").append(a);
        });
    };
}

var script = document.createElement("script");
script.textContent = rule342tumblr.toString() + "\nvar _rule342tumblr = new rule342tumblr();\nsetTimeout(function() { _rule342tumblr.main(); },1000);";
document.head.appendChild(script);