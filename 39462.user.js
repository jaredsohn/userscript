// ==UserScript==
// @name           Orkut New Year Theme By Orkut Sharing For Non-India Users
// @namespace      Orkut Sharing
// @description    This will make non-Indian Orkut users to enjoy the look and feel of New Year Orkut Theme Which is live in India
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
("http://img2.orkut.com/skins/gen/new_year011.css");

enfiaCss(csslinkes[0]);