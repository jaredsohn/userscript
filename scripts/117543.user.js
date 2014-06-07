// ==UserScript==
// @name           Fix the annoying changes in Google Reader UI
// @namespace      http://userscripts.org/users/410282
// @description    Fixes the recent annoying changes in Google Reader UI. Re-using the css used by the chrome extension "Fix Google Reader" (http://goo.gl/gPemt)
// @include        http://www.google.*/reader/*
// ==/UserScript==

//License for the css code//
/*Copyright (c) 2011, Maxwell Swadling
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.*/
(function() {

    function addCss(css) {
        if (typeof GM_addStyle != "undefined") {
            GM_addStyle(css);
        } else if (typeof PRO_addStyle != "undefined") {
            PRO_addStyle(css);
        } else if (typeof addStyle != "undefined") {
            addStyle(css);
        } else {

            var heads = document.getElementsByTagName("head");
            if (heads.length > 0) {
                var node = document.createElement("style");
                node.type = "text/css";
                node.appendChild(document.createTextNode(css));
                heads[0].appendChild(node);
            }
        }

    }

    var cssCode = "\
      #top-bar {\
        height: auto!important;\
        margin-top: 4px;\
        border-bottom: none!important;\
      }\
      \
      #search {\
        padding: 0!important;\
      }\
      \
      #lhn-add-subscription-section {\
        height: 34px!important;\
      }\
      \
      #viewer-header {\
        height: 34px!important;\
      }\
      #viewer-header-container {\
        border-bottom: none!important;\
      }\
      #title-and-status-holder {\
        display: none;\
      }";

    addCss(cssCode);


})();
