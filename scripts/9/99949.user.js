// Display LaTeX in web pages and Gmail ("basic HTML" and "print" views)
// by applying MathJax to it
// Copyright (C) 2010 Valery Alexeev <va.email.tex@gmail.com>
// Version 1.00, May 15, 2010

// Corrected for MathJax 1.1.

// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:

// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
// IN NO EVENT SHALL THE AUTHOR(S) BE LIABLE FOR ANY CLAIM, DAMAGES OR
// OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
// ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
// OTHER DEALNGS IN THE SOFTWARE.
// --------------------------------------------------------------------

// ==UserScript==
// @name          MathJax this page
// @namespace     http://mathoverflow.net
// @description   Display LaTeX in web pages and Gmail by applying MathJax
// @include       http://arxiv.org/*
// @include       http://front.math.ucdavis.edu/*
// @include       http*://*mathscinet*
// @include       http*://mail.google.com/mail/*
// ==/UserScript==

// Modify this line as necessary
var mathjaxServer = 'http://localhost/MathJax/MathJax.js?config=default';
// The rest of the script should not be edited

var script = document.createElement('script');
script.type="text/javascript";
script.src = mathjaxServer;

try { 
    document.getElementsByTagName('head')[0].appendChild(script); 
} catch(e) {}
