// ==UserScript==
// @name            freeze_animated_gifs
// @description   Freeze all animated gifs after a few seconds, saves a lot of CPU
// @include         *
// ==/UserScript==

/**
 * The code below is shamelessly stolen from 
 * http://userscripts.org/scripts/review/80588
 * (thank you for reminding me that filter() 
 * and map() can remove a lot of ugly for and 
 * if and I should make use of the functional 
 * style more often myself)
 *
 * I took the original code and only removed the 
 * event listener, so it will always freeze the gifs 
 * after a few seconds
 */
 
 
function is_gif_image(i) {
	return /^(?!data:).*\.gif/i.test(i.src);
}

function freeze_gif(i) {
	var c = document.createElement('canvas');
	var w = c.width = i.width;
	var h = c.height = i.height;
	c.getContext('2d').drawImage(i, 0, 0, w, h);
	try {
		i.src = c.toDataURL("image/gif"); // if possible, retain all css aspects
	} catch(e) { // cross-domain -- mimic original with all its tag attributes
		for (var j = 0, a; a = i.attributes[j]; j++){
			c.setAttribute(a.name, a.value);
		}
		i.parentNode.replaceChild(c, i);
	}
}

function freeze_all(){
	[].slice.apply(document.images).filter(is_gif_image).map(freeze_gif);
}

setTimeout(freeze_all, 3000);
