// ==UserScript==
// @name		Googlecuts
// @namespace	http://www.tomnipotent.com
// @include		http://www.google.*/search*
// @include		http://images.google.*/images*
// @include		http://www.google.*/products*
// @description Use the arrow keys on your keyboard to move between pages.
// ==/UserScript==

(function(){
	q = document.evaluate("//input[@name='q']", document, null, 0, null).iterateNext().value;
	_b = function() { if ((cp = _cp()) > 0) _go(cp-_pp()); }
	_n = function() { _go(_cp() + _pp()); }
	_go = function(p) { window.location='/'+_sa()+'?q='+escape(q.replace(' ', '+'))+'&start='+p+((_sa() == 'images' && _is() != '') ? '&imgsz='+_is() : ''); }
	_cp = function() { return ((re = /start=([0-9]+)/.exec(window.location)) == null) ? 0 : parseInt(re[1]); }
	_sa = function() { return ((re = /\/(search|images|products)\?/.exec(window.location)) == null) ? 'search' : re[1]; }
	_is = function() { return ((re = /imgsz=([a-zA-Z0-9|]+)/.exec(window.location)) == null) ? '' : re[1]; }
	_pp = function() { return (_sa() == 'images') ? 18 : 10; }
	_cl = function(e) { if (e.keyCode in _mp) _mp[e.keyCode](); }
	_mp = { 39: _n, 92: _n, 37: _b, 91: _b }
	document.addEventListener('keypress', _cl, true);
})();