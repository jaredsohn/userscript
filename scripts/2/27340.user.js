// ==UserScript==
// @name           themes Originais ON
// @namespace      by Kanwar Deep.
// @description    Themes by Orkut, use without the upgrade by Kanwar.
// @include        http://www.orkut.co.in/*
// @author	   Kanwar Deep.
// ==/UserScript==

        function enfiaCss(linkCss){
        void(CSS = document.createElement('link'));
        void(CSS.rel = 'stylesheet');
        void(CSS.href = linkCss);
        void(CSS.type = 'text/css');
        void(document.body.appendChild(CSS));
		}
		
		csslinkes = new Array
		("http://img3.orkut.com/skins/gen/beach001.css",
		"http://img2.orkut.com/skins/gen/solar001.css",
		"http://img2.orkut.com/skins/gen/seasonal001.css",
		"http://img2.orkut.com/skins/gen/snowman001.css",
		"http://img2.orkut.com/skins/gen/bus_stop001.css",
		"http://img2.orkut.com/skins/gen/winter001.css",
		"http://img2.orkut.com/skins/gen/autumn001.css",
		"http://img2.orkut.com/skins/gen/aja_tiger001.css",
		"http://img2.orkut.com/skins/gen/jr001.css",
		"http://img2.orkut.com/skins/gen/tea_house001.css");
		
		enfiaCss(csslinkes[1]);