// Kidum user script
// version 0.3
// 2010-04-27
// Copyright (c) 2010, Yehuda B.
//
// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation
// files (the "Software"), to deal in the Software without
// restriction, including without limitation the rights to use,
// copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the
// Software is furnished to do so, subject to the following
// conditions:
// 
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
// OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
// HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
// WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
// OTHER DEALINGS IN THE SOFTWARE.
//
// ==UserScript==
// @name           Kidum
// @namespace      http://yehudab.com
// @description    Fix Kidum and Lachman eduware. Version 0.3
// @include        http://www.kidum.com/Students/Voc/*
// @include        http://kidum.com/Students/Voc/*
// @include        http://my.lachman.co.il/*
// ==/UserScript==


function fixBoxPosition() {
	addGlobalStyle ("#flash { position: absolute}");
	addGlobalStyle ("#word { position: static}");
	addGlobalStyle ("#box { height:auto; left:0; margin-left:auto; margin-right:auto; margin-top:70px; padding:0 28px 0 0; position:relative; top:0; width:380px; z-index:1;}");
	addGlobalStyle ("* { font-family:Arial Hebrew,Arial;}");
	fixMarginTop();
	window.addEventListener("resize", fixMarginTop, false);
}

function fixRateFlash() {
	if (document.getElementById('rateFlash')) {
		unsafeWindow.rateFlash = document.getElementById('rateFlash');
		unsafeWindow.UpdatePagesSelect = function() {
			var select=unsafeWindow.DOM.Get("currPage");
			while (select.lastChild) select.removeChild(select.lastChild);
			for (var i=1;i<=unsafeWindow.totalPages;i++) {
				var opt=unsafeWindow.DOM.Create("option");
				opt.value=i;
				opt.text=i;
				select.appendChild(opt);
		 	}
		}
	}
}
function fixMarginTop() {
	var flash = document.getElementById("flash");
	var box = document.getElementById("box");
	if (flash != null && box != null) {
		var flashHeight = flash.offsetHeight;
		var marginTop = Math.round((flashHeight - 500)/2) + 25;
		box.style.marginTop = marginTop + "px";
	}
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

fixBoxPosition();
fixRateFlash();
