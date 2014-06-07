// ==UserScript==
// @name          Number MSN Results
// @description	  Numbers results of MSN searches
// @include       http://search.msn.*
// ==/UserScript==



(function() {

	function q() {
		r = window.location;
		e = /first=([0-9]+)/g;
		s = e.exec(r);
		if (s == null) {
			return 1;
		}
		return s[1];
	}
	
	function n() {
		var j = 0;
		var s = q();
		s = parseInt(s);
		q = document.getElementById('results');
		ps=q.getElementsByTagName('h3');
		for (pi = 0; pi < ps.length; pi++) {
			tp = ps[pi];
			w = s + j;
			tp.innerHTML = w + '. ' + tp.innerHTML; j++; 
		}
	}
		
	window.addEventListener("load", n(), false);

})();