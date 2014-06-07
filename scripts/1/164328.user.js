// ==UserScript==
// @name        ajcc2000
// @namespace   http://maxkueng.com/gmscripts
// @description Adds 1 to the page address
// @include     http://www.domain.com/view.php?ID=*
// @version     1
// @grant       none
// ==/UserScript==

(function (window){
	var move = function (bf) {
		var num, url,
			reg = /(.+\?.+\=)(\d+)$/,
			l = window.location.href;

		if (reg.test(l)) {
			url = reg.exec(l)[1];
			num = +reg.exec(l)[2] + (1 * bf);
			window.location.href = url + num;
		}
	};

	var next = function () { move(1) };
	var prev = function () { move(-1) };

	window.addEventListener('keypress', function (e) {
		if (e.altKey && (e.charCode === 104 || e.charCode === 108)) {
			e.preventDefault();
			if (e.charCode === 104) { return prev(); }
			if (e.charCode === 108) { return next(); }
		}
	});
}(window));
