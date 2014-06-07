// ==UserScript==
// @name        Pandora Awesomizer!
// @description Hides the Ad Container and resizes to the minimum size for the player
// @namespace   http://fluidapp.com
// @include     http://pandora.com/*
// @author      Thomas Aylott / subtleGradient
// ==/UserScript==

(function () {
	window.addEventListener('load',function(){
		
		var CSS = {
			'body':{padding:'12px'},
			'#tuner_ad_container':{display:'none'}
		};
		
		var C$$ = '';
		for (var rule in CSS) {
			C$$ += rule + "{";
			for (var property in CSS[rule])
			C$$ += property+':'+CSS[rule][property]+';';
			C$$ += "}\n";
		}
		C$$;
		
		var s = document.createElement('style');
		s.appendChild( document.createTextNode( C$$ ) );
		
		document.getElementsByTagName('head')[0].appendChild(s);
		document.getElementById('spacer').setAttribute('style','');
		
	},true);
	
	var resize = function(){
		window.resizeTo(662,270);
	};
	
	window.addEventListener('resize',function(e){
		setTimeout(resize, 0);
		e.stopPropagation();
	},true);
	
	resize();
})();

