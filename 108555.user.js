// ==UserScript==
// @name          Plusy i minusy na wykop.pl
// @include       http://*.wykop.pl/*
// ==/UserScript==

function exec(fn) {
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = '(' + fn + ')();';
    document.body.appendChild(script);
    document.body.removeChild(script);
}

window.addEventListener("load", function() {
	exec(function() {
		$('li.comment h5.head strong').hover(
			function() {
				$(this).text($(this).metadata().p + " / " + $(this).metadata().m);
			}, 
			function() {
				$(this).text($(this).metadata().t);
			}
		);
	});
}, false);