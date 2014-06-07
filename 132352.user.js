// ==UserScript==
// @name           quick-click
// @description    快速评价客服中心问答
// @include        http*
// ==/UserScript==

try {
	document.getElementById("q1").checked = "checked";
	_el = document.getElementsByTagName('input');
	for (var i=0; i<_el.length; i++ ) {
		if (_el[i].className == "btn_blue_x" ) {
			_el[i].focus()
			_el[i].click()
		}
	}
}
catch (e){ }