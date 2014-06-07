// ==UserScript==
// @name           0nk3lb3rt0
// @namespace      0nk3lb3rt0
// @description    Deutsches Spaßscript für Facebook, ersetzt die Anstupser durch Anpupser
// @version        0.1
// @copyright      2011 by 0nk3lb3rt0 <onkel@genoervt.de>
// @license        MIT; http://en.wikipedia.org/wiki/Mit_license
// ==/UserScript==


/* LICENSE */

// Copyright (c) 2009, 2010 James Campos <james.r.campos@gmail.com>

// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation
// files (the "Software"), to deal in the Software without
// restriction, including without limitation the rights to use,
// copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the
// Software is furnished to do so, subject to the following
// conditions:

// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
// OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
// HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
// WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
// OTHER DEALINGS IN THE SOFTWARE.

(function() {
	document.body.innerHTML.replace('<h4 class="uiHeaderTitle">Anstupser</h4>','<h4 class="uiHeaderTitle">Anpupser</h4>');
}).call(this);
