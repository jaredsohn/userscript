// ==UserScript==
// @name           furaffinity2tumblr
// @namespace      TAT
// @description    Easy upload furaffinity images to tumblr
// @author         TAT
// @include        http://www.furaffinity.net/view/*
// @include        http://www.furaffinity.net/full/*
// @include        https://www.furaffinity.net/view/*
// @include        https://www.furaffinity.net/full/*
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

function furaffinity2tumblr() {
    this.main = function() {
        console.log("furaffinity2tumblr v.1.1 enabled!");
        $(document).ready(function() {
            var a,b = '';
            $("#keywords").find("a").each(function() {
                b += (b !== '' ? ',' : '') + $(this).text();
            });
            a = ' | <b><a href="#" onclick="window.open(\'http://www.tumblr.com/share/photo' + 
                    '?source=' + escape($("#submission").find(".actions").find("a")[2].toString()) +
                    '&caption=' + escape("<a href=\"http://www.furaffinity.net/view/" + document.location.href.split("/")[4] + "/\">" + $("#submission").find(".cat")[0].innerText + "</a> by <a href=\"" + $("#submission").find(".cat").find("a")[0].href + "\">" + $("#submission").find(".cat").find("a")[0].innerText + "</a>") +
                    '&clickthru=' + escape("http://www.furaffinity.net/view/" + document.location.href.split("/")[4] + "/") +
                    (b != "" ? '&tags=' + escape(b) : '') +
                    '\',\'furaffinity2tumblr\',\'width=450,height=450\')">furaffinity2tumblr</a></b>';
            if ($("#submission").find(".actions").find(".next").length > 0)
                $("#submission").find(".actions").find(".next").before(a);
            else
                $("#submission").find(".actions").find("div").before(a);
        });
    };
}

var script = document.createElement("script");
script.textContent = furaffinity2tumblr.toString() + "\nvar _furaffinity2tumblr = new furaffinity2tumblr();\nsetTimeout(function() { _furaffinity2tumblr.main(); },1000);";
document.head.appendChild(script);