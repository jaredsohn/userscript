// ==UserScript==
// @name        youtube - no wide
// @namespace   http://d.hatena.ne.jp/Cherenkov/
// @include     http://www.youtube.com/watch?v=*
// @version     1
// ==/UserScript==

setTimeout(function() {
	if (document.querySelector('.watch-wide, .medium')) {
		var html5SmallBtn = document.querySelector('.html5-small-player-button');
		if (html5SmallBtn) {
			html5SmallBtn.click(); 
		} else {
			var p = document.querySelector('#movie_player, #movie_player-flash');
			var p2 = p.cloneNode(true);
			p2.setAttribute('flashvars', p.getAttribute('flashvars').replace(/&player_wide=1/, '&player_wide=0'));
			p.parentNode.replaceChild(p2, p);
		}
		//css
		var w1 = document.querySelector('.watch-wide');
		w1.classList.remove('watch-wide');
		var w2 = document.querySelector('.medium');
		w2.classList.remove('medium');
		//cookie
		document.cookie = 'wide=0';
	}
}, 500);	
