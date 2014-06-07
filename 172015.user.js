// ==UserScript==
// @name Kate Uptime
// @namespace http://grantsimpson.name/gmscripts
// @description Avoid wasting time by blocking Google image searches for Kate Upton
// @version 1.0
// @include http://images.google.com/*
// @downloadURL http://userscripts.org/scripts/source/172015.user.js

// Copyright 2013 Grant Simpson
// Licensed under the MIT License:
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
// ==/UserScript==

//Add event handler to input element 
var box = document.getElementById("lst-ib");
box.addEventListener('keyup', function(){
	/* If input element contains 'Kate Upton', 'Katherine Upton', or 
	either with a word in between, change the search to 'work productivity.' */ 
	if(this.value.match(/kat(?:herin)*e.*upton/i) != null){	
		this.value = 'work productivity';		
	}
});