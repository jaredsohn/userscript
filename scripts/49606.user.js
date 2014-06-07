// ==UserScript==
// @name           hide_price_for_taobao
// @namespace      me.nowa.labs.greasemonkey
// @description    Hide item price for taobao search list and detail page.
// @include        http://search*.taobao.com/*
// @include        http://item.taobao.com/auction/*
// @include		   http://list.taobao.com/*
// ==/UserScript==

var _list = document.getElementById('list:content');
if (_list) {
	var _lis = _list.getElementsByTagName('li');
	var _flag = false;

	for (var i=0; i<_lis.length; i++) {
		if (_lis[i].className.indexOf('price') > -1) {
			_lis[i].style.display = 'none';
			_flag = true;
		}
	}
	
	if (!_flag) {
		var _divs = _list.getElementsByTagName('div');
		for (var i=0; i<_divs.length; i++) {
			if (_divs[i].className.indexOf('price') > -1) {
				_divs[i].style.display = 'none';
				_flag = true;
			}
		}
	}
}

var _detail = document.getElementById('detail');
if (_detail) {
	var _item_lis = _detail.getElementsByTagName('li');

	for (var i=0; i<_item_lis.length; i++) {
		if (_item_lis[i].className.indexOf('detail\-price') > -1) {
			_item_lis[i].innerHTML = "&nbsp;";
		}
	}
}