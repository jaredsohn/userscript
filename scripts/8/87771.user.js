// ==UserScript==
// @name           NewTwitter transmogrifications
// @namespace      http://brucknerite.net
// @description    Performs UI modifications on New Twitter (does not work on Old Twitter).
// @include        http://twitter.com/*
// ==/UserScript==

// License:
//
// Copyright (c) 2010 Ivan Rivera
//
// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation
// files (the "Software"), to deal in the Software without
// restriction, including without limitation the rights to use,
// copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the
// Software is furnished to do so, subject to the following
// conditions:
// 
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
// OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
// HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
// WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
// OTHER DEALINGS IN THE SOFTWARE.

document.body.addEventListener("DOMNodeInserted", __gm_bruckneritenet_cssInjection, false);

function __gm_bruckneritenet_cssInjection() {
    var stream = document.getElementsByClassName("stream").item(0);
    var dashboard = document.getElementsByClassName("dashboard").item(0);
    if (stream != null && dashboard != null) {
        stream.style.height = dashboard.offsetHeight + "px";
        stream.style.overflow = "auto";
    }
}
