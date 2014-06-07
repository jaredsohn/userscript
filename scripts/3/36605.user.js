// ==UserScript==
// @name           Angel Fixup
// @namespace      http://freecog.net/2008/
// @description    Fixes some crappy things on Angel.
// @include        https://angel.rose-hulman.edu/Angel/*
// ==/UserScript==

function clean() {
	Array.slice(document.getElementsByTagName("a")).forEach(function(a) {
		if (/CSSE432-01/.test(a.textContent)) {
			a.style.backgroundColor = "red";
			var container = a.parentNode.parentNode;
			container.parentNode.removeChild(container);
		} else if (/HTML Editor/i.test(a.textContent)) {
			a.tabIndex = -1;
		} else if (/\d+ points max/i.test(a.textContent)) {
			a.style.padding = '1em 0';
			a.style.display = 'inline-block';
			a.tabIndex = -1;
		}
	});
	// Text is diffcult to scan when it's centered
	Array.forEach(document.getElementsByTagName("td"), function(td) {
		if (td.className === 'gridcolumn') {
			td.style.textAlign = 'left';
		}
	});
	Array.forEach(document.getElementsByTagName("div"), function(div) {
		if (/(_responseText|_answerTextDiv)$/.test(div.id)) {
			div.textContent = div.innerHTML.replace(/\n\s*$/, '')
			div.style.fontFamily = 'monospace';
			if (/_answerTextDiv$/.test(div.id)) {
				var d2 = div.cloneNode(true);
				with (d2.style) {
					position = 'fixed';
					top = '0';
					left = '0';
					right = '0';
					padding = '.5em .5em .5em 1.8em';
					background = '#BEE5C5';
					borderBottom = '2px solid black';
				}
				document.body.appendChild(d2);
			} else if (/^\s*$/.test(div.textContent)) {
				// Mark blank responses zeroes
				var input_id = div.id.replace(/_responseText$/, '_txtScore');
				document.getElementById(input_id).value = '0';
			}
		}
	});
}

clean();
window.addEventListener('load', function() {
	window.setTimeout(clean, 0); // Force it to run after Angel's JS
}, false);
