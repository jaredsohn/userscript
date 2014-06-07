// ==UserScript==
// @name FB Dumbass KILL
// @namespace      FBDK
// @include        *://www.facebook.com/*
// ==/UserScript==
var ppl, id, delay = 5000, prefix = 'fbdk-';
var banned = null;
gtfo();
function gtfo() {
	console.log('clear faggots');
	banned = window.localStorage.getItem(prefix+'banned');
	if(banned !== null) {
		banned = banned.split(',');
	}
	ppl = document.querySelectorAll('.storyContent > .actorPhoto');
	[].slice.call(ppl).forEach(function(el){
		var parts = el.href.split('/');
		if(banned !== null && banned.indexOf(parts[3]) >= 0) {
			el.parentNode.parentNode.removeChild(el.parentNode);
		} else {
			if(el.getAttribute('data-fbdk') === null) {
				var remover = document.createElement('a');
					remover.textContent = 'wypierdol';
					remover.href = '#fbdk='+parts[3];
				el.parentNode.appendChild(remover);
				remover.addEventListener('click', function(e) {
					e.preventDefault();
					add_gtfo(parts[3]);
				}, false);
				el.setAttribute('data-fbdk', true);
			}
		}
	});
}
function add_gtfo(faggot) {
	if(banned !== null  && banned.indexOf(faggot) < 0) {
		banned.push(faggot);
	} else {
		banned = [faggot];
	}
	window.localStorage.setItem(prefix+'banned', banned.join(','));
	console.log(window.localStorage.getItem(prefix+'banned'));
}
id = setInterval(function() {
	gtfo();
}, delay);