// ==UserScript==
// @name          Alpha Image
// @namespace     http://artyv.ru
// @description   Makes images a little transparent.
// @include       *
// ==/UserScript==

function makeImagesTransparent(opacity) {
	GM_setValue('alphaImageOpacity', opacity);

	images = document.getElementsByTagName('img');
	for(i = 0; i < images.length; i++) {		images[i].style.opacity = opacity/100;
		images[i].addEventListener('mouseover', function(){ this.style.opacity = 1; }, false);
		images[i].addEventListener('mouseout', function(){ this.style.opacity = opacity/100; }, false);
	}
}

function alphaImageInit() {
	GM_registerMenuCommand('Set images opacity to 50%', function(){ GM_setValue('alphaImageOpacity', 50); });
	GM_registerMenuCommand('Set images opacity to 40%', function(){ GM_setValue('alphaImageOpacity', 40); });
	GM_registerMenuCommand('Set images opacity to 30%', function(){ GM_setValue('alphaImageOpacity', 30); });
	GM_registerMenuCommand('Set images opacity to 20%', function(){ GM_setValue('alphaImageOpacity', 20); });
	GM_registerMenuCommand('Set images opacity to 10%', function(){ GM_setValue('alphaImageOpacity', 10); });

	makeImagesTransparent(GM_getValue('alphaImageOpacity', 20));
}

alphaImageInit();