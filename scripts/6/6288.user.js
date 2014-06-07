
// ==License==
// Copyright (c) 2006 pheno
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense,
// and/or sell copies of the Software, and to permit persons to whom the
// Software is furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
// DEALINGS IN THE SOFTWARE.
// ==/License==

// ==UserScript==
// @name           Ungdomar.se Ignore
// @description    Hide posts from specific users on ungdomar.se
// @author         pheno
// @version        0.1
// @date           2006-11-10
// @namespace      http://ungdomar.se
// @include        http://ungdomar.se/*
// ==/UserScript==

// ==Settings==
var ignoreList = new Array(
  // "This",
  // "Is",
  // "Four",
  // "Examples"
)
// ==/Settings==

// ==Code==
var allElements = document.getElementsByTagName('td')
for(var i = 0; i < allElements.length; i++) {
  var thisElement = allElements[i]
  if(thisElement.getAttribute('onMouseDown')) {
    var userName = thisElement.getAttribute('onMouseDown').split("'")[1]
    for(x in ignoreList)
      if(userName == ignoreList[x])
        thisElement.style.visibility = "hidden"
  }
}
// ==/Code==
