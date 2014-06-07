// ==UserScript==
// @name           Include Linked Images
// @namespace      ca.notcharles.greasemonkey
// @description    Add linked images to the end of a webpage.
// @include        http://www.wizards.com/*&pf=true
// ==/UserScript==

/*
Copyright (c) 2008 Joe Mason 

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

var body = document.getElementsByTagName('body')[0];
var anchors = document.getElementsByTagName(’a');

for (var i = 0; i < anchors.length; i++)
{
	var anchor = anchors[i];

	// only process anchors containing images
	if (anchor.getElementsByTagName(’img’).length == 0) continue;

	// add the target of the image to the end of the document
	var href = anchor.getAttribute(’href’);
	var hr = document.createElement(’hr’);
	body.appendChild(hr);
	var img = document.createElement(’img’);
	img.setAttribute(’src’, href);
	body.appendChild(img);
}