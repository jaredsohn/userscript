// ==UserScript==
// @name           4chan ResFinder
// @namespace      com.maltera.4chanres
// @description    Highlights images on 4chan at or above your screen resolution.
// @include        http://boards.4chan.org/*
// @grant          none
// ==/UserScript==
//
// Copyright (c) 2010 Sam Hanes
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

var width = window.screen.width;
var height = window.screen.height;

var style = document.createElement( "style" );
style.setAttribute( "type", "text/css" );
style.appendChild( document.createTextNode( ""
		+ "div.post.resmatch { "
		+ "    background-color: #D5F0D8; "
		+ "    border-color: #B6D9BE; "
		+ "} "
        + ""
        + "div.post.resbigger { "
		+ "    background-color: #D5E3F0; "
		+ "    border-color: #B6CDD9; "
		+ "} "
	));
document.getElementsByTagName( "head" ).item( 0 ).appendChild( style );

var match = document.evaluate(
		'//span[@class="fileText"]/text()[' +
			' contains(' +
				' translate( string(), "() ", ",,," ),' +
				' ",' + width + 'x' + height + ',"' +
			' )' +
		' ]/ancestor::div[' +
		    ' contains(' +
		        ' concat( ",", translate( @class, " ", "," ), "," ),' +
		        ' ",post," ' +
		    ' )' +
		' ]',
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );

for (var idx = 0; idx < match.snapshotLength; idx++) {
	var node = match.snapshotItem( idx );

	var current = node.getAttribute( "class" );
	node.setAttribute( "class",
			(current != "" ? current + " " : "") + "resmatch" );
}

var bigger = document.evaluate(
		'//span[@class="fileText"]/text()[' +
			' number(' +
				' substring-before(' +
					' substring-after( string(), ", " ),' +
					' "x"' +
				' )' +
			' ) > number( "' + width + '" )' +
			' and number(' +
				' substring-before(' +
					' substring-after(' +
						' translate( string(), ")", "," ),' +
						' "x" ),' +
					' ","' +
				' )' +
			' ) > number( "' + height + '" )' +
		' ]/ancestor::div[' +
		    ' contains(' +
		        ' concat( ",", translate( @class, " ", "," ), "," ),' +
		        ' ",post," ' +
		    ' )' +
		' ]',
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );

for (var idx = 0; idx < bigger.snapshotLength; idx++) {
	var node = bigger.snapshotItem( idx );

	var current = node.getAttribute( "class" );
	node.setAttribute( "class",
			(current != "" ? current + " " : "") + "resbigger" );
}