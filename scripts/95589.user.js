// ==UserScript==
// @name           Playlist.com: Delete Broken Songs
// @namespace      http://userscripts.org/scripts/source/62706.user.js
// @include        http://www.playlist.com/playlist/*/manage
// ==/UserScript==
//
// Copyright (c) 2010 Chris "Jesdisciple" Carter
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

window.addEventListener('load', function (e){
    var ajax = new XMLHttpRequest();
    var links = document.getElementsByClassName('broken');
    var i = 0;
    del();
    function del(){
      var items = links[i].childNodes;
      ajax.open('GET', items[items.length - 2].firstChild.href, true);
      ajax.onreadystatechange = function (){
          ++i;
          // Wait a second to avoid networking-ish errors.
          setTimeout(del, 1000);
        };
      ajax.send(); 
    }
  }, false);
