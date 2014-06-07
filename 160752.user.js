// ==UserScript==
// @name           plugCubedLoader
// @namespace      net.plugCubed
// @description    Autorun plugCubed on plug.dj
// @author         Thomas "TAT" Andresen
// @include        http://plug.dj/*
// @version        1.8
// @grant          none
// ==/UserScript==

/*
The MIT License (MIT)
Copyright (c) 2012-2013 Thomas "TAT" Andresen

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

(function() {
    var a = {
        b: function() {
            if (typeof API !== 'undefined' && API.enabled)
                this.c();
            else
                setTimeout(function() { a.b(); }, 100);
        },
        c: function() {
            console.log('plugCubedLoader v.1.8 enabled!');
            $.getScript('https://d1rfegul30378.cloudfront.net/files/plugCubed.min.js');
        }
    };
    a.b();
})();