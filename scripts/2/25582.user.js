// Om Nom Nom Killer
// version 1.01
// 2008-04-24
// Copyright (c) 2008, Michael Day <manveru.alma@gmail.com>
// Released under the MIT license
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
//
// --------------------------------------------------------------------
//
// This small Greasemonkey script will remove any occurence of the
// phrase "Om nom nom" from any web page you view, even with small 
// changes like "omnomnom" or "nom nom nom". The change is made when
// the page loads but should be okay for the majority of the web.
//
// This script is known to break some websites where text is removed
// from a link or script. If you encounter any problems, disabling 
// this script might fix them.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Om Nom Nom Killer
// @namespace     tag:manveru.alma@gmail.com,2008-04-24:OmNomNomKiller
// @description   Remove any occurance of 'Om nom nom' from any webpage.
// @todo          Do not remove anything from links or scripts
// @include       *
// @exclude
// ==/UserScript==

window.document.body.innerHTML = window.document.body.innerHTML.replace(/(?:(?:om)? ?(?:nom(?: ?)){2,})\b|(?:om nom\b)/gi,'');