// ==UserScript==
// @name           Orkut New Year Theme By Orkut Sharing For Non-Brazilian User 
// @namespace      Orkut Sharing
// @description    This will make non-Brazilian Orkut users to enjoy the look and feel of New Year Orkut Theme Which is live in Brazil
// @include        http://www.orkut.co*/*
// @author    http://orkutsharing.blogspot.com
// ==/UserScript==

        function enfiaCss(linkCss){
        void(CSS = document.createElement('link'));
        void(CSS.rel = 'stylesheet');
        void(CSS.href = linkCss);
        void(CSS.type = 'text/css');
        void(document.body.appendChild(CSS));
}

csslinkes = new Array
("http://img2.orkut.com/skins/gen/new_year_oi011.css");

enfiaCss(csslinkes[0]);