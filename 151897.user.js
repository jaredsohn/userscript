// ==UserScript==
// @name          	SunSteps.org Reminder
// @description     Never forget to donate to charity when online shopping
//
// @author			Lukas Brückner <lukas@lukas-brueckner.de>
// @namespace       http://github.com/luksurious
//
// @include         /^https?://(www\.)?amazon.[^\.]+/
// @include			/^https?://(www\.)?cyberport.de/
// @include			/^https?://(www\.)?thalia.de/
// @include			/^https?://(www\.)?zalando.de/
//
// @version         1.0
// ==/UserScript==

/* TODO
- remember choice for session (yes, no); don't bother to show on every if interaction happened
- auto update

*/
(function() {
	var addTopBanner = function() {
		var bar = document.createElement("div");
		bar.style.position = 'absolute';
		bar.style.backgroundColor = '#ffffaa';
		bar.style.top = '0';
		bar.style.left = '0';
		bar.style.right = '0';
		bar.style.padding = '5px';
		bar.style.textAlign = 'center';
		bar.style.borderBottom = '1px solid #cccccc';
		bar.style.zIndex = '100';
		bar.style.fontSize = '18px';
		bar.innerHTML = 'Möchtest du mit diesem Einkauf eine kleine Spende an ein Hilfs-Projekt machen? <a href="http://sunsteps.org">Ja, zu SunSteps gehen!</a>';

		var cancel = document.createElement("a");
		cancel.innerHTML = "Jetzt nicht";
		cancel.setAttribute('href', 'javascript:void(0);')
		cancel.onclick = function() {
			document.body.removeChild(bar);
		};
		bar.appendChild(cancel);

		document.body.appendChild(bar);
	};

	addTopBanner();
})();