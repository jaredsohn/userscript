// ==UserScript==
// @name          Show subreddit
// @namespace     http://github.com/mikm/
// @description   Displays the subreddit for all links pointing to reddit.com
// @include       http://*.reddit.com/r/*
// @include       http://*.reddit.com/
// @include       http://*.reddit.com/new/
// @include       http://*.reddit.com/controversial/
// @include       http://*.reddit.com/top/
// @include       http://*.reddit.com/saved/
// ==/UserScript==

/*Copyright (c) 2010 Michael McKinley

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


function $x( xpath, root ) {
  var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;
  var got = doc.evaluate( xpath, root||doc, null, 0, null ), result = [];
  switch (got.resultType) {
    case got.STRING_TYPE:
      return got.stringValue;
    case got.NUMBER_TYPE:
      return got.numberValue;
    case got.BOOLEAN_TYPE:
      return got.booleanValue;
    default:
      while ((next = got.iterateNext()))
	result.push( next );
      return result;
  }
}

function $X( xpath, root ) {
  var got = $x( xpath, root );
  return got instanceof Array ? got[0] : got;
}


var subreddit_matcher = /http:\/\/.*\.reddit\.com\/r\/([^\/]+)\//;
var items = "/html/body/div[@class='content']/div[@id='siteTable']/div[contains(normalize-space(@class), 'thing') and contains(., 'reddit.com')]/div[2]/p[@class='title']";


var to_modify = $x(items, document);
for (var i = 0; i < to_modify.length; ++i) {
    var url = $X("./a", to_modify[i]);
    
    var subreddit = subreddit_matcher.exec(url.href);
    if (!subreddit) continue;
    subreddit = subreddit[1];
    
    var domain = $X("./span[@class='domain']/a", to_modify[i]);
    domain.innerHTML += "/" + subreddit;
    
}