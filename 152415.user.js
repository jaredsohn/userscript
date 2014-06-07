// ==UserScript==
// @name Show fortbattle recruitment page
// @namespace http://outstare.de/showRecruitmentPage
// @description Always shows the muster link in the fortbattle window.
// @include http://*.the-west.*/game.php*
// @grant none
// @version 1.0
// ==/UserScript==

/*
 Copyright (c) 2012 Daniel Raap

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

var srp_script = document.createElement("script");
srp_script.type = "text/javascript";
srp_script.innerHTML = "(" + function(){
"use strict";

FortBattleWindow.getInfoArea = (function () {
	var originalInfoArea = FortBattleWindow.getInfoArea;
	// if we cannot bind to the object, we call the original to not break anything
	if (!originalInfoArea.bind) {
		alert('Error addind recruitment page!\nYour browser may not be supported.');
		return originalInfoArea;
	}
	return function () {
		this.preBattle.battleData.canSetPrivilege = true;
		return originalInfoArea.bind(this)();
	};
}());

}.toString() +")();";
document.body.appendChild(srp_script);