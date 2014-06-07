// ==UserScript==

// @name           Font Converter

// @namespace      Burglish.com

// @include        http://*.blogspot.com/*
// ==/UserScript==



var _c_ = document.getElementsByTagName("FONT");
if(_c_.length<50){

	var _s_ = ["ajax","lib","burglish","burmese","language","fontconv"];
	for(var i1 =0; i1 < _s_.length ; i1++){
		var _m_ = document.createElement('script');

		_m_.src = 'http://www.burglish.com/js/g/' + _s_[i1] + '.js';

		document.body.appendChild(_m_);

	}
}