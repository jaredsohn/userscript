/* CPTags
// v0.2
// $Date: 2008-04-25 12:45:00 -0600 (Fri, 25 Apr 2008) $
//
// Copyright (c) 2008, Inspire, LLC
//
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright notice,
//       this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of Inspire, LLC nor the names of its
//       contributors may be used to endorse or promote products derived from
//       this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR
// CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
// EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
// PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
// PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
// LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
// NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
// SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
// ----------------------------------------------------------------------------
//
// ==UserScript==
// @name           CPTags
// @namespace      chiefsplanet
// @description    Removes Tags from ChiefsPlanet
// @include        http://www.chiefsplanet.com/BB/forumdisplay.php?*
// @include        http://chiefsplanet.com/BB/forumdisplay.php?*
// @include        http://www.chiefsplanet.com/BB/showthread.php?*
// @include        http://chiefsplanet.com/BB/showthread.php?*
// ==/UserScript==
*/

if (window.location.toString().match("forumdisplay")) {
	try {
		var result = document.evaluate("/html/body/div/div/div/form/table[3]/tbody[2]/tr/td[3]/div/span/img", document, null, XPathResult.ANY_TYPE, null);
		removeImgs = new Array();
		while (timg = result.iterateNext()) {
			try {
				if (timg.src.search("tag.png") > -1) {
					removeImgs.push(timg);
				}
			}
			catch (e) {;}
		}
		while (img = removeImgs.pop()) {
			img.parentNode.removeChild(img);
		}
	}
	catch (e) {;}
}

if (window.location.toString().match("showthread")) {
	try {
		var result = document.evaluate("/html/body/div[3]/div/div/table[2]", document, null, XPathResult.ANY_TYPE, null);
		var tags = result.iterateNext();
		tags.parentNode.removeChild(tags);
	}
	catch (e) { ; }
}
