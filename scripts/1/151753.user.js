// ==UserScript==
// @id             etherpadMax
// @name           Legacy etherpad maximizer
// @version        1.0
// @namespace
// @author         Pandark (lifeleaks.com)
// @license        MIT
// @description    Automatically maximize legacy etherpad (1.x).
// @include        http://framapad.org/*
// @include        https://framapad.org/*
// @include        http://*.framapad.org/*
// @include        https://*.framapad.org/*
// @exclude        http://lite.framapad.org/*
// @exclude        https://lite.framapad.org/*
// @include        https://etherpad.mozilla.org/*
// @include        https://*.etherpad.mozilla.org/*
// @include        http://piratepad.net/*
// @include        http://titanpad.com/*
// @run-at         document-end
// ==/UserScript==

/*
*  Copyright (c) 2012 Pandark (lifeleaks.com)
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation files
* (the "Software"), to deal in the Software without restriction,
* including without limitation the rights to use, copy, modify, merge,
* publish, distribute, sublicense, and/or sell copies of the Software,
* and to permit persons to whom the Software is furnished to do so,
* subject to the following conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/

(function () {
  window.setTimeout(function () {
    var bodyClass = (document.body.hasAttribute("class")) && document.body.getAttribute("class") || "";
    var maximizeButton = document.getElementById('fullscreen') ||
      document.getElementsByClassName('topbarmaximize')[0] ||
      document.getElementById('widthprefcheck');
    if ( !( bodyClass.match(/maximized|fullwidth/) ) ) {
      maximizeButton.click();
    }
  }, 1);
})();