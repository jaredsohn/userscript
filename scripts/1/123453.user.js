// Unblackout Wikipedia
// version 1.00
// 2012-04-24
// Copyright (c) 2012, Michael Day <manveru.alma@gmail.com>
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
// On January 18, 2012, Wikipedia protested SOPA and PIPA by blacking
// out their entire site. This script, useful only for a single day,
// stops that blackout and lets you use Wikipedia again.
//
// By the way, email and call your congressmen. SOPA and PIPA need to
// be stopped. For more information, disable this script.
// 
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Unblackout Wikipedia
// @namespace     tag:manveru.alma@gmail.com,2012-01-18:UnblackoutWikipedia
// @description   View Wikipedia articles during Wikipedia's SOPA blackout.
// @include       *.wikipedia.org/*
// @exclude
// ==/UserScript==
setTimeout(function(){
	window.document.getElementById('mw-sopaOverlay').style.display = 'none';
	window.document.getElementById('mw-page-base').style.display   = 'block';
	window.document.getElementById('mw-head-base').style.display   = 'block';
	window.document.getElementById('content').style.display        = 'block';
	window.document.getElementById('mw-head').style.display        = 'block';
	window.document.getElementById('mw-panel').style.display       = 'block';
	window.document.getElementById('footer').style.display         = 'block';
}, 500);
