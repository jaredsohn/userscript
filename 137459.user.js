// ==UserScript==
// @name          Fair play blocker by MiDa911
// @description   Otklananja Far Play popup u slagalici 
// @include       http://fb.slagalica-online.com/application/*
// @include       https://fb.slagalica-online.com/application/*
// ==/UserScript==


    (function(){
            var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_Script = document.createElement('script');
            GM_Script.src = 'https://raw.github.com/feroc1ty/slagalica-disable-popup/master/slagalica.js';
            GM_Script.type = 'text/javascript';
            GM_Script.async = true;
            GM_Head.insertBefore(GM_Script, GM_Head.firstChild);
	})();