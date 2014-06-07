// ==UserScript==
// @name           tagged.com profile sanitizer
// @namespace      tagged
// @description    remove flashy background in tagged friends profiles
// @include        http://www.tagged.com/profile.html?uid=*
// @include        http://*.tagged.com/profile.html?uid=*
// @include        http://tagged.com/profile.html?uid=*
// ==/UserScript==

_csslink = new Array();
_csslink.push( document.getElementById('link_header_css') );
_csslink.push( document.getElementById('link_css') );
_csslink.push( document.getElementById('link_custom_css') );

for ( var i = 0 ; i < _csslink.length ; i++ ){
	if ( _csslink[i] && _csslink[i].parentNode && _csslink[i].parentNode.removeChild ) {
		_csslink[i].parentNode.removeChild(_csslink[i]);
	}
}
