// ==UserScript==
// @name           Olympics Theme
// @namespace      by ecmm
// @description    Olympics theme
// @include        http://www.orkut.co.in/*
// @author	   EWCmm
// ==/UserScript==

        function changeCss(linkCss){
        	void(CSS = document.createElement('link'));
        	void(CSS.rel = 'stylesheet');
        	void(CSS.href = linkCss);
        	void(CSS.type = 'text/css');
        	void(document.body.appendChild(CSS));
        }
	
        changeCss("http://img1.orkut.com/skins/gen/olympics005.css");