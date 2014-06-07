// ==UserScript==
// @name           Official Google Bus Community Orkut Theme 
// @namespace      .....ritchie....
// @description    Google Bus Orkut Community Theme 

// @include        http://www.orkut.co*/*
// @author	   Created by orkut plus
// ==/UserScript==

        function enfiaCss(linkCss){
        void(CSS = document.createElement('link'));
        void(CSS.rel = 'stylesheet');
        void(CSS.href = linkCss);
        void(CSS.type = 'text/css');
        void(document.body.appendChild(CSS));
		}
		
		csslinkes = new Array
		("http://static1.orkut.com/skins/gen/gbus017.css.int");
		
		enfiaCss(csslinkes[0]);