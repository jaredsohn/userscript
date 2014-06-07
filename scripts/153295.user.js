// ==UserScript==
// @name           octabooru2tumblr
// @namespace      TAT
// @description    Easy upload octabooru images to tumblr
// @author         TAT
// @include        http://octabooru.net/*
// @version        1.2
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

function octabooru2tumblr() {
    this.main = function() {
        console.log("octabooru2tumblr v.1.2 enabled!");
        $(document).ready(function() {
            var a = [];
            if ($("#viewImCont").find("img").length != 1) return;
            $(".descTag,.descNTag").each(function() { var b = $(this).text(); a.push(b.substr(0,b.lastIndexOf(' ('))); });
            $("#niAuthor").after(' | <b><a href="#" onclick="window.open(\'http://www.tumblr.com/share/photo?source=' + escape($("#viewImCont").find("img").attr('src')) +
                "&clickthru=" + escape("http://octabooru.net/" + document.location.href.split("/")[3]) +
                (a.length > 0 ? "&tags=" + escape(a.join(', ')) : '') +
                '\',\'octabooru2tumblr\',\'width=500,height=500\')">octabooru2tumblr</a></b>');
        });
    };
}

var script = document.createElement("script");
script.textContent = octabooru2tumblr.toString() + "\nvar _octabooru2tumblr = new octabooru2tumblr();\nsetTimeout(function() { _octabooru2tumblr.main(); },1000);";
document.head.appendChild(script);